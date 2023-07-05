import getYouTubeID from "get-youtube-id";

export default function YouTubeVideo({ url }: { url: string }) {
  const id = getYouTubeID(url);
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
