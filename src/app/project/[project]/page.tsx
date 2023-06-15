import ProjectDetail from "@/components/ProjectDetail";
import client, { ProjectSkeleton } from "@/utils/contentful";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export default async function Project({
  params,
  searchParams,
}: {
  params: { project: string };
  searchParams: { dp?: string; ir?: string };
}) {
  const projects = await client.withoutUnresolvableLinks.getEntries<ProjectSkeleton>({
    content_type: "project",
    locale: "es-US",
    "fields.slug": params.project,
  });

  if (projects.total === 0) {
    return notFound();
  }

  const project = projects.items[0];
  const downPayment = +(searchParams.dp ?? "3.5");
  const interestRate = +(searchParams.ir ?? "6");

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 my-12">
      <ProjectDetail data={project} initialValues={{ downPayment, interestRate }} />
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
