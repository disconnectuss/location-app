"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvent } from "react-leaflet/hooks";

// Map Event Listener
function MapEventListener() {
  const map = useMapEvent("click", (e) => {
    console.log(e.latlng);
  });

  return null;
}

// Map Container
const Map = () => {
  return (
    <MapContainer
      center={[39.340544, 35.310927]}
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEventListener />
    </MapContainer>
  );
};

export default Map;
