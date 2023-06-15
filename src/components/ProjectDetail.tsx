import { Locale, ProjectSkeleton } from "@/utils/contentful";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Entry } from "contentful";
import Image from "next/image";
import Link from "next/link";
import Contactinfo from "./ContactInfo";
import ProjectCharacteristics from "./ProjectCharacteristics";
import ProjectEstimate from "./ProjectEstimate";
import ProjectLocation from "./ProjectLocation";
import VirtualTour from "./VirtualTour";
import YouTubeVideo from "./YouTubeVideo";

export default async function ProjectDetail({
  data,
  initialValues,
}: {
  data: Entry<ProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", Locale>;
  initialValues: { downPayment: number; interestRate: number };
}) {
  const {
    name,
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
    virtualTour,
  } = data.fields;

  return (
    <div className="card card-compact w-full max-w-screen-md bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{name}</h1>
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
        <div className="divider my-0"></div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {images.map((image) => (
            <div className="" key={image!.sys.id}>
              <Image
                src={`https:${image!.fields.file!.url}`}
                alt={image!.fields.title!}
                className="rounded-box aspect-video object-cover"
                width={352}
                height={198}
              />
            </div>
          ))}
        </div>
        <div className=" md:mx-20">
          <ProjectCharacteristics data={{ area, bedrooms, bathrooms, garages }} />
        </div>
        <div className="prose max-w-none">{documentToReactComponents(await richTextFromMarkdown(description))}</div>
        <div className="flex items-center justify-center py-4">
          <div className="flex basis-2/5 flex-col items-center gap-y-6 text-lg">
            <div className="flex flex-col items-center gap-2 md:flex-row">
              <div className="tooltip" data-tip="Valor aproximado">
                <span className="font-semibold">HOA mensual</span>
              </div>
              <strong className="badge badge-primary badge-outline badge-lg">
                {hoa.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </strong>
            </div>
            <div className="flex flex-col items-center gap-2 md:flex-row">
              <div className="tooltip" data-tip="Valor aproximado">
                <span className="font-semibold">CDD anual</span>
              </div>
              <strong className="badge badge-primary badge-outline badge-lg">
                {cdd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </strong>
            </div>
            <div className="flex flex-col items-center gap-2 md:flex-row">
              <div className="tooltip" data-tip="Valor aproximado">
                <span className="font-semibold">Impuesto</span>
              </div>
              <strong className="badge badge-primary badge-outline badge-lg">
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
          <YouTubeVideo url={youTubeVideo} />
        </div>
        <div>
          <h2 className="card-title h-8">Tour virtual</h2>
          <VirtualTour url={virtualTour} />
        </div>
        <div>
          <h2 className="card-title h-8">Estima tu pago mensual</h2>
          <ProjectEstimate price={priceFrom} fees={hoa + cdd / 12} initialValues={{ ...initialValues, taxRate }} />
        </div>
        <div>
          <h2 className="card-title h-10">Contáctame</h2>
          <Contactinfo project={name} />
        </div>
        <div className="card-actions mt-4 justify-end">
          <Link href="/" className="btn-primary btn grow">
            Ver más propiedades
          </Link>
        </div>
      </div>
    </div>
  );
}
