import { Locale, ProjectSkeleton } from "@/utils/contentful";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Entry } from "contentful";
import { BathIcon, BedSingleIcon, CarIcon, HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProjectLocation from "./ProjectLocation";

export default async function ProjectDetail({
  data,
}: {
  data: Entry<ProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", Locale>;
}) {
  const {
    name,
    slug,
    images,
    description,
    priceFrom,
    area,
    bedrooms,
    bathrooms,
    garages,
    hoa,
    cdd,
    taxRate,
    location,
    youTubeVideo,
  } = data.fields;

  return (
    <div className="card card-compact w-full max-w-screen-md bg-base-100 shadow-xl my-12">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h1 className="card-title h-8">{name}</h1>
          <div
            className="tooltip"
            data-tip="Los precios y las características pueden variar y están sujetos a cambios."
          >
            <p className="text-right text-lg">
              {priceFrom.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })}
              +
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center items-center my-2">
          {images.map((image) => (
            <div className="" key={image!.sys.id}>
              <Image
                src={`https:${image!.fields.file!.url}`}
                alt={image!.fields.title!}
                className="rounded-box"
                width={352}
                height={198}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-nowrap justify-around p-2 mx-20">
          <div className="flex justify-center items-center space-x-2 w-30">
            <HomeIcon />
            <span className="font-bold">
              {area.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
              ft<sup>2</sup>
            </span>
          </div>
          <div className="flex justify-center items-center space-x-2 w-30">
            <BedSingleIcon />
            <span className="font-bold">{bedrooms}</span>
          </div>
          <div className="flex justify-center items-center space-x-2 w-30">
            <BathIcon />
            <span className="font-bold">{bathrooms}</span>
          </div>
          <div className="flex justify-center items-center space-x-2 w-30">
            <CarIcon />
            <span className="font-bold">{garages}</span>
          </div>
        </div>
        <div className="prose max-w-none">{documentToReactComponents(await richTextFromMarkdown(description))}</div>
        <div className="flex justify-center items-center py-4">
          <div className="basis-2/5 flex flex-col items-center gap-y-6 text-lg">
            <div>
              <span>HOA aproximado: </span>
              <strong className="badge badge-lg badge-primary badge-outline">
                {hoa.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </strong>
            </div>
            <div>
              <span>CDD aproximado: </span>
              <strong className="badge badge-lg badge-primary badge-outline">
                {cdd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </strong>
            </div>
            <div>
              <span>Impuesto aproximado: </span>
              <strong className="badge badge-lg badge-primary badge-outline">
                {taxRate.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
                %
              </strong>
            </div>
          </div>
          <div className="basis-3/5">
            <ProjectLocation location={location} />
          </div>
        </div>
        <div>
          <h2 className="card-title h-8">Video de la propiedad</h2>
          <iframe
            width="100%"
            height="414"
            src={`https://www.youtube.com/embed/${new URL(youTubeVideo).searchParams.get("v")}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
        <div className="card-actions justify-end">
          <Link href={`/project/${slug}`} className="btn btn-primary">
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
}
