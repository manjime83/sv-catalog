import { Locale, ProjectSkeleton } from "@/utils/contentful";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Entry } from "contentful";
import {
  BathIcon,
  BedSingleIcon,
  CarIcon,
  FacebookIcon,
  HomeIcon,
  InstagramIcon,
  MailIcon,
  PhoneCallIcon,
  YoutubeIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProjectEstimate from "./ProjectEstimate";
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
        <div className="flex flex-nowrap justify-around p-2 md:mx-20">
          <div className="min-w-30 flex items-center justify-center space-x-2">
            <HomeIcon className="text-secondary" />
            <span className="font-bold whitespace-nowrap">
              {area.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
              <span>
                {" "}
                ft<sup>2</sup>
              </span>
            </span>
          </div>
          <div className="min-w-30 flex items-center justify-center space-x-2">
            <BedSingleIcon className="text-secondary" />
            <span className="font-bold whitespace-nowrap">{bedrooms}</span>
          </div>
          <div className="min-w-30 flex items-center justify-center space-x-2">
            <BathIcon className="text-secondary" />
            <span className="font-bold whitespace-nowrap">{bathrooms}</span>
          </div>
          <div className="min-w-30 flex items-center justify-center space-x-2">
            <CarIcon className="text-secondary" />
            <span className="font-bold whitespace-nowrap">{garages}</span>
          </div>
        </div>
        <div className="prose max-w-none">{documentToReactComponents(await richTextFromMarkdown(description))}</div>
        <div className="flex items-center justify-center py-4">
          <div className="flex basis-2/5 flex-col items-center gap-y-6 text-lg">
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <div className="tooltip" data-tip="Valor aproximado">
                <span className="font-semibold">HOA</span>
              </div>
              <strong className="badge badge-primary badge-outline badge-lg">
                {hoa.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </strong>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <div className="tooltip" data-tip="Valor aproximado">
                <span className="font-semibold">CDD</span>{" "}
              </div>
              <strong className="badge badge-primary badge-outline badge-lg">
                {cdd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </strong>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <div className="tooltip" data-tip="Valor aproximado">
                <span className="font-semibold">Impuesto</span>{" "}
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
          <iframe
            width="100%"
            src={`https://www.youtube.com/embed/${new URL(youTubeVideo).searchParams.get("v")}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="aspect-video"
          />
        </div>
        <div>
          <h2 className="card-title h-8">Tour virtual</h2>
          <iframe
            width="100%"
            allowFullScreen
            src={`${virtualTour}&mls=1&lang=es&title=0&search=0&play=1`}
            allow="xr-spatial-tracking"
            className="aspect-video"
          />
        </div>
        <div>
          <h2 className="card-title h-8">Estima tu pago mensual</h2>
          <ProjectEstimate price={priceFrom} taxRate={taxRate} fees={hoa + cdd / 12} />
        </div>
        <div>
          <h2 className="card-title h-10">Contáctame</h2>
          <div className="flex flex-grow justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center space-y-4 text-lg">
              <div>
                <a
                  href={`https://wa.me/+17869566199?text=${encodeURIComponent(
                    "Hola Sandra, me gustaría saber más sobre la propiedad " + name
                  )}`}
                  target="_blank"
                  className="flex justify-center items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="Capa_1"
                    width="24px"
                    height="24px"
                    viewBox="0 0 30.667 30.667"
                    fill="#34d399"
                  >
                    <g>
                      <path d="M30.667,14.939c0,8.25-6.74,14.938-15.056,14.938c-2.639,0-5.118-0.675-7.276-1.857L0,30.667l2.717-8.017   c-1.37-2.25-2.159-4.892-2.159-7.712C0.559,6.688,7.297,0,15.613,0C23.928,0.002,30.667,6.689,30.667,14.939z M15.61,2.382   c-6.979,0-12.656,5.634-12.656,12.56c0,2.748,0.896,5.292,2.411,7.362l-1.58,4.663l4.862-1.545c2,1.312,4.393,2.076,6.963,2.076   c6.979,0,12.658-5.633,12.658-12.559C28.27,8.016,22.59,2.382,15.61,2.382z M23.214,18.38c-0.094-0.151-0.34-0.243-0.708-0.427   c-0.367-0.184-2.184-1.069-2.521-1.189c-0.34-0.123-0.586-0.185-0.832,0.182c-0.243,0.367-0.951,1.191-1.168,1.437   c-0.215,0.245-0.43,0.276-0.799,0.095c-0.369-0.186-1.559-0.57-2.969-1.817c-1.097-0.972-1.838-2.169-2.052-2.536   c-0.217-0.366-0.022-0.564,0.161-0.746c0.165-0.165,0.369-0.428,0.554-0.643c0.185-0.213,0.246-0.364,0.369-0.609   c0.121-0.245,0.06-0.458-0.031-0.643c-0.092-0.184-0.829-1.984-1.138-2.717c-0.307-0.732-0.614-0.611-0.83-0.611   c-0.215,0-0.461-0.03-0.707-0.03S9.897,8.215,9.56,8.582s-1.291,1.252-1.291,3.054c0,1.804,1.321,3.543,1.506,3.787   c0.186,0.243,2.554,4.062,6.305,5.528c3.753,1.465,3.753,0.976,4.429,0.914c0.678-0.062,2.184-0.885,2.49-1.739   C23.307,19.268,23.307,18.533,23.214,18.38z" />
                    </g>
                  </svg>
                  <strong>Hablemos por WhatsApp</strong>{" "}
                </a>
              </div>
              <div>
                <a href="mailto:sandravargasrealtor@gmail.com" className="flex justify-center items-center gap-2">
                  <MailIcon className="link link-primary" />
                  <strong>sandravargasrealtor@gmail.com</strong>
                </a>
              </div>
              <div>
                <a href="tel:+17869566199" className="flex justify-center items-center gap-2">
                  <PhoneCallIcon className="link link-primary" />
                  <strong>+1 (786) 956-6199</strong>
                </a>
              </div>
              <div className="h-2"></div>
              <div className="flex justify-center items-center gap-2 space-x-4">
                <a
                  className="link link-primary"
                  href={`https://www.instagram.com/sandravargasrealtorfl`}
                  target="_blank"
                >
                  <InstagramIcon />
                </a>
                <a className="link link-primary" href={`https://www.facebook.com/sandravargasrealtor`} target="_blank">
                  <FacebookIcon />
                </a>
                <a className="link link-primary" href={`https://www.youtube.com/@sandravargasrealtor`} target="_blank">
                  <YoutubeIcon />
                </a>
              </div>
            </div>
            <div className="divider divider-horizontal hidden md:flex"></div>
            <div className="md:flex md:justify-center md:items-center hidden">
              <Image
                src="/channels4_profile.jpg"
                alt="Sandra Vargas"
                className="rounded-full"
                width={200}
                height={200}
              />
            </div>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <Link href="/" className="btn-primary btn grow">
            Ver más propiedades
          </Link>
        </div>
      </div>
    </div>
  );
}
