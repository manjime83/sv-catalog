import ProjectCard from "@/components/ProjectCard";
import client, { CategorySkeleton } from "@/utils/contentful";
import { notFound } from "next/navigation";

export default async function Category({ params }: { params: { category: string } }) {
  const categories = await client.withoutUnresolvableLinks.getEntries<CategorySkeleton>({
    content_type: "category",
    locale: "es-US",
    "fields.slug": params.category,
  });

  if (categories.total === 0) {
    return notFound();
  }

  const category = categories.items[0];

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 bg-gray-100 h-screen">
      {category.fields.projects.map((project) => (
        <ProjectCard key={project!.sys.id} data={project!} />
      ))}
    </div>
  );
}

export async function generateStaticParams() {
  const entries = await client.withoutLinkResolution.getEntries<CategorySkeleton>({
    content_type: "category",
    locale: "es-US",
  });
  const staticParams = entries.items.map((item) => ({
    category: item.fields.slug,
  }));
  return staticParams;
}
