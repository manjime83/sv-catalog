import CategoryCard from "@/components/CategoryCard";
import client, { CategorySkeleton } from "@/utils/contentful";

export default async function Categories() {
  const categories = await client.withoutUnresolvableLinks.getEntries<CategorySkeleton>({
    content_type: "category",
    locale: "es-US",
  });

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 my-12">
      {categories.items.map((category) => (
        <CategoryCard key={category.sys.id} data={category} />
      ))}
    </div>
  );
}

export async function generateStaticParams() {
  return [{}];
}
