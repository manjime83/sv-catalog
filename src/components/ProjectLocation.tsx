"use client";

import { Circle, GoogleMap, LoadScriptNext } from "@react-google-maps/api";

export default function ProjectLocation({ location }: { location: { lat: number; lon: number } }) {
  return (
    <LoadScriptNext googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={{
          height: "250px",
        }}
        center={{
          lat: location.lat,
          lng: location.lon,
        }}
        zoom={11}
        options={{ disableDefaultUI: true, zoomControl: true }}
      >
        <Circle
          center={{ lat: location.lat, lng: location.lon }}
          radius={3000}
          options={{ strokeWeight: 0, fillColor: "#c850a0", fillOpacity: 0.3 }}
        />
      </GoogleMap>
    </LoadScriptNext>
  );
}
