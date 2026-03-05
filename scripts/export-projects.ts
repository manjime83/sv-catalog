import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createClient } from "contentful";

const LOCALE = "es-US";
const PAGE_SIZE = 100;
const OUTPUT_DIR = path.join(process.cwd(), "exports", "projects");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "projects.json");

type ProjectStage = "draft" | "changed" | "published";

type Tag = {
  sys: {
    id: string;
  };
};

type AssetEntry = {
  sys: {
    id: string;
  };
  fields?: {
    title?: string;
    description?: string;
    file?: {
      url?: string;
      fileName?: string;
      contentType?: string;
      details?: {
        size?: number;
        image?: {
          width?: number;
          height?: number;
        };
      };
    };
  };
};

type ProjectEntry = {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
    revision: number;
    version?: number;
    publishedVersion?: number;
    locale?: string;
  };
  metadata?: {
    tags?: Tag[];
  };
  fields: {
    name?: string;
    slug?: string;
    city?: string;
    shortDescription?: string;
    description?: string;
    youTubeVideo?: string;
    virtualTour?: string;
    location?: {
      lat: number;
      lon: number;
    };
    priceFrom?: number;
    bedrooms?: number;
    bathrooms?: number;
    garages?: number;
    area?: number;
    hoa?: number;
    cdd?: number;
    taxRate?: number;
    insuranceRate?: number;
    showCalculator?: boolean;
    images?: AssetEntry[];
  };
};

type CategoryEntry = {
  sys: {
    id: string;
  };
  fields: {
    name?: string;
    slug?: string;
    description?: string;
    image?: AssetEntry;
    projects?: Array<ProjectEntry | null>;
  };
};

type CategorySummary = {
  id: string;
  name: string | null;
  slug: string | null;
  description: string | null;
  imageUrl: string | null;
};

type SerializedAsset = {
  id: string;
  title: string | null;
  description: string | null;
  url: string | null;
  fileName: string | null;
  contentType: string | null;
  size: number | null;
  width: number | null;
  height: number | null;
};

type SerializedProject = {
  id: string;
  createdAt: string;
  updatedAt: string;
  revision: number;
  version: number | null;
  publishedVersion: number | null;
  locale: string | null;
  stage: ProjectStage;
  tags: string[];
  name: string | null;
  slug: string | null;
  city: string | null;
  shortDescription: string | null;
  description: string | null;
  youTubeVideo: string | null;
  virtualTour: string | null;
  location: {
    lat: number;
    lon: number;
  } | null;
  priceFrom: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  garages: number | null;
  area: number | null;
  hoa: number | null;
  cdd: number | null;
  taxRate: number | null;
  insuranceRate: number | null;
  showCalculator: boolean | null;
  categories: CategorySummary[];
  images: SerializedAsset[];
  imageUrls: string[];
};

async function loadEnvFile(filePath: string): Promise<void> {
  try {
    const contents = await readFile(filePath, "utf8");

    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      const rawValue = trimmed.slice(separatorIndex + 1).trim();

      if (key && !(key in process.env)) {
        process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
      }
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function toAbsoluteUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

function serializeAsset(asset?: AssetEntry | null): SerializedAsset | null {
  if (!asset?.fields?.file) return null;

  return {
    id: asset.sys.id,
    title: asset.fields.title ?? null,
    description: asset.fields.description ?? null,
    url: toAbsoluteUrl(asset.fields.file.url),
    fileName: asset.fields.file.fileName ?? null,
    contentType: asset.fields.file.contentType ?? null,
    size: asset.fields.file.details?.size ?? null,
    width: asset.fields.file.details?.image?.width ?? null,
    height: asset.fields.file.details?.image?.height ?? null,
  };
}

async function fetchAllEntries<T>(client: ReturnType<typeof createClient>, query: Record<string, unknown>): Promise<T[]> {
  const items: T[] = [];
  let skip = 0;
  let total = 0;

  do {
    const response = await client.withoutUnresolvableLinks.getEntries({
      ...query,
      locale: LOCALE,
      limit: PAGE_SIZE,
      skip,
      include: 10,
    });

    items.push(...(response.items as T[]));
    total = response.total;
    skip += response.items.length;
  } while (items.length < total);

  return items;
}

function buildCategoryLookup(categories: CategoryEntry[]): Map<string, CategorySummary[]> {
  const lookup = new Map<string, CategorySummary[]>();

  for (const category of categories) {
    const relatedProjects = category.fields.projects ?? [];
    for (const project of relatedProjects) {
      if (!project?.sys?.id) continue;

      const existing = lookup.get(project.sys.id) ?? [];
      existing.push({
        id: category.sys.id,
        name: category.fields.name ?? null,
        slug: category.fields.slug ?? null,
        description: category.fields.description ?? null,
        imageUrl: toAbsoluteUrl(category.fields.image?.fields?.file?.url),
      });
      lookup.set(project.sys.id, existing);
    }
  }

  return lookup;
}

function getProjectStage(project: ProjectEntry): ProjectStage {
  const version = typeof project.sys.version === "number" ? project.sys.version : null;
  const publishedVersion = typeof project.sys.publishedVersion === "number" ? project.sys.publishedVersion : null;

  if (publishedVersion === null) {
    return "draft";
  }

  if (version !== null && version >= publishedVersion + 2) {
    return "changed";
  }

  return "published";
}

function serializeProject(project: ProjectEntry, categoriesByProjectId: Map<string, CategorySummary[]>): SerializedProject {
  const images = (project.fields.images ?? [])
    .map((image) => serializeAsset(image))
    .filter((image): image is SerializedAsset => image !== null);

  return {
    id: project.sys.id,
    createdAt: project.sys.createdAt,
    updatedAt: project.sys.updatedAt,
    revision: project.sys.revision,
    version: project.sys.version ?? null,
    publishedVersion: project.sys.publishedVersion ?? null,
    locale: project.sys.locale ?? null,
    stage: getProjectStage(project),
    tags: project.metadata?.tags?.map((tag) => tag.sys.id) ?? [],
    name: project.fields.name ?? null,
    slug: project.fields.slug ?? null,
    city: project.fields.city ?? null,
    shortDescription: project.fields.shortDescription ?? null,
    description: project.fields.description ?? null,
    youTubeVideo: project.fields.youTubeVideo ?? null,
    virtualTour: project.fields.virtualTour ?? null,
    location: project.fields.location ?? null,
    priceFrom: project.fields.priceFrom ?? null,
    bedrooms: project.fields.bedrooms ?? null,
    bathrooms: project.fields.bathrooms ?? null,
    garages: project.fields.garages ?? null,
    area: project.fields.area ?? null,
    hoa: project.fields.hoa ?? null,
    cdd: project.fields.cdd ?? null,
    taxRate: project.fields.taxRate ?? null,
    insuranceRate: project.fields.insuranceRate ?? null,
    showCalculator: project.fields.showCalculator ?? null,
    categories: categoriesByProjectId.get(project.sys.id) ?? [],
    images,
    imageUrls: images.map((image) => image.url).filter((url): url is string => Boolean(url)),
  };
}

async function main(): Promise<void> {
  await loadEnvFile(path.join(process.cwd(), ".env.local"));

  const previewAccessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  const client = createClient({
    space: requireEnv("CONTENTFUL_SPACE_ID"),
    accessToken: previewAccessToken || requireEnv("CONTENTFUL_ACCESS_TOKEN"),
    ...(previewAccessToken ? { host: "preview.contentful.com" } : {}),
  });

  const [projects, categories] = await Promise.all([
    fetchAllEntries<ProjectEntry>(client, { content_type: "project" }),
    fetchAllEntries<CategoryEntry>(client, { content_type: "category" }),
  ]);

  const categoriesByProjectId = buildCategoryLookup(categories);
  const serializedProjects = projects
    .map((project) => serializeProject(project, categoriesByProjectId))
    .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "", "en"));

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(OUTPUT_FILE, `${JSON.stringify(serializedProjects, null, 2)}\n`, "utf8");

  const draftCount = serializedProjects.filter((project) => project.stage === "draft").length;
  const changedCount = serializedProjects.filter((project) => project.stage === "changed").length;
  const sourceLabel = previewAccessToken ? "preview API" : "delivery API";

  console.log(
    `Exported ${serializedProjects.length} projects to ${OUTPUT_FILE} using ${sourceLabel} (${draftCount} draft, ${changedCount} changed draft)`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
