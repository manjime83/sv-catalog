import ProjectsLocations from "@/components/ProjectsLocations";
import client, { ProjectSkeleton } from "@/utils/contentful";

export default async function ProjectMapPage({ params }: { params: { project: string } }) {
  const entries = await client.withoutLinkResolution.getEntries<ProjectSkeleton>({
    content_type: "project",
    locale: "es-US",
  });
  const projects = entries.items.map((item) => ({
    slug: item.fields.slug,
    name: item.fields.name,
    price: item.fields.priceFrom,
    location: { lat: item.fields.location.lat, lon: item.fields.location.lon },
  }));

  return (
    <div className="relative flex-grow">
      <div className="absolute top-0 left-0 w-full h-full">
        <ProjectsLocations projects={projects} />
      </div>
    </div>
  );
}
