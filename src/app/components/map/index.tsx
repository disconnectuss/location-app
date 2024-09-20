"use client";

import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { LatLng, LatLngExpression } from "leaflet";
import FormModal from "../modal";
import { Location } from "@/lib/slices/locationSlice";
import { greenIcon, redIcon, blueIcon, userIcon } from "@/utils/constants";
import { Heading } from "@chakra-ui/react";
import getUserLoc from "@/utils/getLoc";

// Map Event Listener
function MapEventListener() {
  const [selected, setSelected] = useState<LatLng | null>();
  useMapEvent("click", (e) => {
    setSelected(e.latlng);
  });
  if (selected) {
    return <FormModal close={() => setSelected(null)} selected={selected} />;
  }

  return null;
}

type MapProps = { locations?: Location[]; isClickable?: boolean };

// Map Container
const Map = ({ locations, isClickable }: MapProps) => {
  const userLoc = getUserLoc();

  const lineArr = locations && [
    userLoc,
    ...locations!.map((i) => [i.lat, i.lng]),
  ];

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

      {isClickable && <MapEventListener />}

      <Marker position={userLoc} icon={userIcon}>
        <Popup>Current Location!</Popup>
      </Marker>

      {locations &&
        locations.map((i) => (
          <Marker
            key={`${i.lat}-${i.lng}`} // Assign unique key using latitude and longitude
            icon={
              i.color === "red"
                ? redIcon
                : i.color === "green"
                ? greenIcon
                : blueIcon
            }
            position={[i.lat, i.lng]}
          >
            <Popup>
              <Heading size="sm">{i.title}</Heading>
              <p>{i.lat}</p>
              <p>{i.lng}</p>
            </Popup>
          </Marker>
        ))}

      {locations && <Polyline positions={lineArr as LatLngExpression[]} />}
    </MapContainer>
  );
};

export default Map;
