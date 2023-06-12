export default function YouTubeVideo({ url: u }: { url: string }) {
  const url = new URL(u);
  const id = url.searchParams.get("v");

  return (
    <iframe
      width="100%"
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      className="aspect-video"
    />
  );
}
