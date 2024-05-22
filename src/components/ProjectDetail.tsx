import { Locale, ProjectSkeleton } from "@/utils/contentful";
import getMortgageRate from "@/utils/mortgageRates";
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

const mortgageRate = getMortgageRate();

export default async function ProjectDetail({
  data,
}: {
  data: Entry<ProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", Locale>;
}) {
  const {
    name,
    city,
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
    insuranceRate,
    location,
    youTubeVideo,
    virtualTour,
  } = data.fields;

  return (
    <div className="w-full max-w-screen-md shadow-xl card card-compact bg-base-100">
      <div className="card-body">
        <div className="flex flex-col items-center justify-between">
          <h1 className="w-full text-xl font-semibold text-left truncate md:text-3xl">{name}</h1>
          <div className="flex flex-col w-full mx-2">
            <div className="flex items-center justify-between">
              <p>{city}</p>
              <p
                className="text-lg text-right tooltip"
                data-tip="Los precios y las características pueden variar y están sujetos a cambios."
              >
                {priceFrom.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
                +
              </p>
            </div>
          </div>
        </div>
        <div className="my-0 divider"></div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {images.map((image) => (
            <div className="" key={image!.sys.id}>
              <Image
                src={`https:${image!.fields.file!.url}`}
                alt={image!.fields.title!}
                className="object-cover rounded-box aspect-video"
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
          <div className="flex flex-col items-center text-lg basis-2/5 gap-y-6">
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
            {/* <div className="flex flex-col items-center gap-2 md:flex-row">
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
            </div> */}
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
            <h2 className="h-8 card-title">Ubicación</h2>
            <div className="p-1 border rounded border-1">
              <ProjectLocation location={location} />
            </div>
          </div>
        </div>
        {youTubeVideo && (
          <div>
            <h2 className="h-8 card-title">Video de la propiedad</h2>
            <div className="p-1 border rounded border-1">
              <YouTubeVideo url={youTubeVideo} />
            </div>
          </div>
        )}
        {virtualTour && (
          <div>
            <h2 className="h-8 card-title">Tour virtual</h2>
            <div className="p-1 border rounded border-1">
              <VirtualTour url={virtualTour} />
            </div>
          </div>
        )}
        <div>
          <h2 className="h-8 card-title">Estima tu pago mensual</h2>
          <ProjectEstimate
            price={priceFrom}
            fees={hoa + cdd / 12}
            taxRate={taxRate}
            insuranceRate={insuranceRate}
            mortgageRate={await mortgageRate}
          />
        </div>
        <div>
          <h2 className="h-10 card-title">Contáctame</h2>
          <Contactinfo project={name} />
        </div>
        <div className="justify-end mt-4 card-actions">
          <Link href="/" className="btn-primary btn grow">
            Ver más propiedades
          </Link>
        </div>
      </div>
    </div>
  );
}
