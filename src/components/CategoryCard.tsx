import { CategorySkeleton, Locale } from "@/utils/contentful";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Entry } from "contentful";
import Image from "next/image";
import Link from "next/link";

export default async function Category({
  data,
}: {
  data: Entry<CategorySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", Locale>;
}) {
  const { name, slug, description, image, projects } = data.fields;

  return (
    <div className="shadow-xl card card-compact w-96 bg-base-100">
      <figure className="relative object-cover aspect-video w-96">
        <Image src={`https:${image!.fields.file!.url}`} alt={image!.fields.title!} width={640} height={360} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="h-20">{documentToReactComponents(await richTextFromMarkdown(description))}</div>
        <div className="justify-end card-actions">
          <Link href={`/category/${slug}`} className="btn-primary btn grow">
            Ver {projects.length} propiedad{projects.length > 1 && "es"}
          </Link>
        </div>
      </div>
    </div>
  );
}
