import ProjectDetail from "@/components/ProjectDetail";
import client, { ProjectSkeleton } from "@/utils/contentful";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export default async function Project({ params }: { params: Promise<{ project: string }> }) {
  const projects = await client.withoutUnresolvableLinks.getEntries<ProjectSkeleton>({
    content_type: "project",
    locale: "es-US",
    "fields.slug": (await params).project,
  });

  if (projects.total === 0) {
    return notFound();
  }

  const project = projects.items[0];

  return (
    <div className="my-12 flex flex-wrap items-center justify-center gap-4">
      <ProjectDetail data={project} />
    </div>
  );
}

export async function generateStaticParams() {
  const entries = await client.withoutLinkResolution.getEntries<ProjectSkeleton>({
    content_type: "project",
    locale: "es-US",
  });
  const staticParams = entries.items.map((item) => ({
    project: item.fields.slug,
  }));
  return staticParams;
}
