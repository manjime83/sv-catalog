export default function VirtualTour({ url: u }: { url: string }) {
  const url = new URL(u);
  url.searchParams.set("lang", "es");
  url.searchParams.set("mls", "1");
  url.searchParams.set("title", "0");
  url.searchParams.set("search", "0");
  url.searchParams.set("play", "1");

  return (
    <iframe width="100%" allowFullScreen src={url.toString()} allow="xr-spatial-tracking" className="aspect-video" />
  );
}
