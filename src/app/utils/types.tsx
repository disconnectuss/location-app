// src/types.tsx
import { LatLngLiteral } from "leaflet";
export interface Location {
  id: string;
  title: string;
  lat: number;
  lng: number;
  color: string;
}
export interface LocationState {
  locations: Location[];
}
export interface MapProps {
  locations?: Location[];
  isClickable?: boolean;
}
export interface LocationEditProps {
  params: {
    id: string;
  };
}
export interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  editItem?: Location;
  onClose?: () => void;
  latlng?: [number, number];
}
export interface LinkItem {
  href: string;
  label: string;
}
export interface NavLinkProps {
  href: string;
  label: string;
}
export interface FormModalProps {
  close: () => void;
  selected: LatLngLiteral | null;
}
export interface RootLayoutProps extends React.PropsWithChildren<{}> {}
