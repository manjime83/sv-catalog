interface MortgageRate {
  rate: number;
  points: number;
  RateId: number;
  RateDate: string;
  product: string;
  shortName: string;
  description: string;
  productKey: string;
  change: number;
  previous: number;
  direction: string;
  date: string;
  rateFraction: string;
}

export default async function getMortgageRate() {
  const res = await fetch("https://widgets.mortgagenewsdaily.com/Widget/Rates", { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`Failed to fetch mortgage rates: ${res.statusText}`);
  }

  const data: MortgageRate[] = await res.json();
  const rateItem = data.find((item) => item.productKey === "30YRFRM");

  if (!rateItem) {
    throw new Error("Could not find 30YRFRM rate");
  }

  return rateItem.rate;
}
