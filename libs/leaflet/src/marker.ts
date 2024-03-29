export type Marker = {
  lat: number;
  lng: number;
  message?: string;
} | undefined;

export type Markers = Marker[];