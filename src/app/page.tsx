import CategoryCard from "@/components/CategoryCard";
import client, { CategorySkeleton } from "@/utils/contentful";
import Link from "next/link";

export default async function Categories() {
  const categories = await client.withoutUnresolvableLinks.getEntries<CategorySkeleton>({
    content_type: "category",
    locale: "es-US",
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-4 my-12">
        {categories.items.map((category) => (
          <CategoryCard key={category.sys.id} data={category} />
        ))}
      </div>
      <div className="flex items-center justify-center ">
        <Link href={`/projects/map`} className="btn btn-outline">
          Ver mapa de proyectos
        </Link>
      </div>
    </div>
  );
}
