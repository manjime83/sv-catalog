import * as cheerio from "cheerio";

export default async function getMortgageRate() {
  const data = await fetch("https://www.mortgagenewsdaily.com/mortgage-rates");
  const text = await data.text();
  const $ = cheerio.load(text);
  const value = $("div.price").first().text();
  const mortgageRate = +value.replace("%", "");
  console.debug("🚀 ~ file: mortgageRates.ts:9 ~ getMortgageRate ~ mortgageRate:", mortgageRate);
  return mortgageRate;
}
