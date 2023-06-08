import { Locale, ProjectSkeleton } from "@/utils/contentful";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Entry } from "contentful";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectDetail({
  data,
}: {
  data: Entry<ProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", Locale>;
}) {
  const { name, slug, images, shortDescription, priceFrom } = data.fields;

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure className="relative w-96 h-[13.5rem]">
        <Image src={`https:${images[0]!.fields.file!.url}`} alt={images[0]!.fields.title!} fill />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{name}</h2>
          <p className="text-right text-lg">
            {priceFrom.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            })}
            +
          </p>
        </div>
        <div className="h-20">{documentToReactComponents(await richTextFromMarkdown(shortDescription))}</div>
        <div className="card-actions justify-end">
          <Link href={`/project/${slug}`} className="btn btn-primary">
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
}
