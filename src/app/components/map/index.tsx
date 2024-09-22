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
import { useState, useEffect, useMemo } from "react";
import { LatLng, LatLngExpression } from "leaflet";
import FormModal from "../modal";
import { MapProps } from "@/utils/types";
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
const Map: React.FC<MapProps> = ({ locations = [], isClickable = false }) => {
  const [userLoc, setUserLoc] = useState<[number, number]>([39.9334, 32.8597]); // Default location (Ankara)
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const loc = await getUserLoc();
        setUserLoc(loc);
      } catch (err) {
        console.error("Error fetching user location:", err);
        setError("Could not fetch user location, using default.");
      }
    };
    fetchUserLocation();
  }, []);
  const lineArr = useMemo(() => {
    return locations.length
      ? [
          userLoc,
          ...locations.map((loc) => [loc.lat, loc.lng] as [number, number]),
        ]
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
      {error && <p>{error}</p>}
    </MapContainer>
  );
};
export default Map;
