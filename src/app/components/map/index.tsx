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
import { useState, useMemo } from "react";
import { LatLng, LatLngExpression } from "leaflet";
import FormModal from "../modal";
import { Location } from "@/lib/store/locationSlice";
import { greenIcon, redIcon, blueIcon, userIcon } from "@/utils/constants";
import { Heading } from "@chakra-ui/react";
import getUserLoc from "@/utils/getLoc";
function MapEventListener() {
  const [selected, setSelected] = useState<LatLng | null>(null);
  useMapEvent("click", (e) => {
    setSelected(e.latlng);
  });
  return selected ? (
    <FormModal close={() => setSelected(null)} selected={selected} />
  ) : null;
}
type MapProps = {
  locations?: Location[];
  isClickable?: boolean;
};
const getIconByColor = (color: string) => {
  switch (color) {
    case "red":
      return redIcon;
    case "green":
      return greenIcon;
    case "blue":
    default:
      return blueIcon;
  }
};
const Map = ({ locations = [], isClickable = false }: MapProps) => {
  const userLoc = getUserLoc() || [39.9334, 32.8597];
  const lineArr = useMemo(() => {
    return locations.length
      ? [userLoc, ...locations.map((loc) => [loc.lat, loc.lng])]
      : [userLoc];
  }, [locations, userLoc]);
  return (
    <MapContainer center={userLoc} zoom={6} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {isClickable && <MapEventListener />}
      <Marker position={userLoc} icon={userIcon}>
        <Popup>Hey hey! You are here!</Popup>
      </Marker>
      {locations.map((loc) => (
        <Marker
          key={`${loc.lat}-${loc.lng}`}
          icon={getIconByColor(loc.color)}
          position={[loc.lat, loc.lng]}
        >
          <Popup>
            <Heading size="sm">{loc.title}</Heading>
            <p>{loc.lat}</p>
            <p>{loc.lng}</p>
          </Popup>
        </Marker>
      ))}
      {locations.length > 0 && (
        <Polyline positions={lineArr as LatLngExpression[]} />
      )}
    </MapContainer>
  );
};
export default Map;
