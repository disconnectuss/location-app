'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapEvent } from 'react-leaflet/hooks';
import { useState } from 'react';
import { icon, LatLng } from 'leaflet';
import FormModal from '../modal';
import { Location } from '@/lib/slices/locationSlice';

// Map Event Listener
function MapEventListener() {
  const [selected, setSelected] = useState<LatLng | null>();

  const map = useMapEvent('click', (e) => {
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
  const mIcon = icon({
    iconUrl: 'https://www.svgrepo.com/show/376955/map-marker.svg',
    iconSize: [30, 30],
  });

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

      {locations &&
        locations.map((i) => (
          <Marker icon={mIcon} position={[i.lat, i.lng]}>
            <Popup>

              <h1>{i.title}</h1>
              
               <br />

              <h1>
                {i.lat} {i.lng}
              </h1>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default Map;
