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
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure className="relative aspect-video w-96 object-cover">
        <Image src={`https:${image!.fields.file!.url}`} alt={image!.fields.title!} width={640} height={360} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="h-20">{documentToReactComponents(await richTextFromMarkdown(description))}</div>
        <div className="card-actions justify-end">
          <Link href={`/${slug}`} className="btn-primary btn grow">
            Ver {projects.length} propiedad{projects.length > 1 && "es"}
          </Link>
        </div>
      </div>
    </div>
  );
}
