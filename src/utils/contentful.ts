import { EntryFieldTypes, createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export default client;

export type CategorySkeleton = {
  contentTypeId: "category";
  fields: {
    name: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    image: EntryFieldTypes.AssetLink;
    description: EntryFieldTypes.Text;
    projects: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ProjectSkeleton>>;
  };
};

export type ProjectSkeleton = {
  contentTypeId: "project";
  fields: {
    name: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text; 
    city: EntryFieldTypes.Text;
    images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    shortDescription: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    youTubeVideo: EntryFieldTypes.Text;
    virtualTour: EntryFieldTypes.Text;
    location: EntryFieldTypes.Location;
    priceFrom: EntryFieldTypes.Integer;
    bedrooms: EntryFieldTypes.Integer;
    bathrooms: EntryFieldTypes.Number;
    garages: EntryFieldTypes.Integer;
    area: EntryFieldTypes.Integer;
    hoa: EntryFieldTypes.Integer;
    cdd: EntryFieldTypes.Integer;
    taxRate: EntryFieldTypes.Number;
    insuranceRate: EntryFieldTypes.Number;
    showCalculator: EntryFieldTypes.Boolean;
  };
};

export type Locale = "es-US";
