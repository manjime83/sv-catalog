"use client";

import { GoogleMap, InfoWindow, LoadScriptNext, Marker } from "@react-google-maps/api";
import Link from "next/link";
import { useState } from "react";

type Project = {
  slug: string;
  name: string;
  price: number;
  location: { lat: number; lon: number };
};

export default function ProjectsLocations({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project>();

  const handleOnLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    projects.forEach(({ location }) => bounds.extend(new google.maps.LatLng({ lat: location.lat, lng: location.lon })));
    map.fitBounds(bounds);
  };

  return (
    <LoadScriptNext googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}&loading=async`}>
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setSelectedProject(undefined)}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{ disableDefaultUI: true, zoomControl: true, fullscreenControl: true }}
      >
        {projects.map((project) => (
          <Marker
            key={project.slug}
            position={{ lat: project.location.lat, lng: project.location.lon }}
            onClick={() => setSelectedProject(project)}
          />
        ))}

        {selectedProject && (
          <InfoWindow
            position={{ lat: selectedProject.location.lat, lng: selectedProject.location.lon }}
            options={{ pixelOffset: new window.google.maps.Size(0, -40), minWidth: 200 }}
            onCloseClick={() => setSelectedProject(undefined)}
          >
            <div className="flex flex-col gap-y-2">
              <strong>{selectedProject.name}</strong>
              <p>Precio desde: ${selectedProject.price.toLocaleString("en-US")}</p>
              <Link href={`/project/${selectedProject.slug}`} className="btn-link btn-xs btn-block btn grow">
                Ver detalle
              </Link>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
}
