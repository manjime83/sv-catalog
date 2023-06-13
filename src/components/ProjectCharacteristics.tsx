import { BathIcon, BedSingleIcon, CarIcon, HomeIcon } from "lucide-react";

export default function ProjectCharacteristics({
  data: { area, bedrooms, bathrooms, garages },
}: {
  data: {
    area: number;
    bedrooms: number;
    bathrooms: number;
    garages: number;
  };
}) {
  return (
    <div className="flex flex-nowrap justify-around p-2">
      <div className="min-w-30 flex items-center justify-center space-x-2">
        <HomeIcon className="text-secondary" />
        <span className="whitespace-nowrap font-bold">
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
        <span className="whitespace-nowrap font-bold">{bedrooms}</span>
      </div>
      <div className="min-w-30 flex items-center justify-center space-x-2">
        <BathIcon className="text-secondary" />
        <span className="whitespace-nowrap font-bold">{bathrooms}</span>
      </div>
      <div className="min-w-30 flex items-center justify-center space-x-2">
        <CarIcon className="text-secondary" />
        <span className="whitespace-nowrap font-bold">{garages}</span>
      </div>
    </div>
  );
}
