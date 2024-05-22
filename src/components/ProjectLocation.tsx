"use client";

import { Circle, GoogleMap, LoadScriptNext } from "@react-google-maps/api";

export default function ProjectLocation({ location }: { location: { lat: number; lon: number } }) {
  return (
    <LoadScriptNext googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}&loading=async`}>
      <GoogleMap
        mapContainerStyle={{
          height: "250px",
        }}
        center={{
          lat: location.lat,
          lng: location.lon,
        }}
        zoom={9}
        options={{ disableDefaultUI: true, zoomControl: true, fullscreenControl: true }}
      >
        <Circle
          center={{ lat: location.lat, lng: location.lon }}
          radius={5000}
          options={{ strokeWeight: 0, fillColor: "#c850a0", fillOpacity: 0.4 }}
        />
      </GoogleMap>
    </LoadScriptNext>
  );
}
