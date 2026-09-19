"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in leaflet with webpack
import L from "leaflet";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function Map({ type = "zones" }: { type?: "zones" | "live" }) {
  useEffect(() => {
    // Leaflet init side effects
  }, []);

  if (type === "live") {
    return (
      <MapContainer center={[28.6139, 77.2090]} zoom={13} style={{ height: "100%", width: "100%", zIndex: 0 }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[28.6139, 77.2090]}>
          <Popup>Rider: Rahul Sharma<br />Status: Delivering</Popup>
        </Marker>
        <Marker position={[28.6239, 77.2190]}>
          <Popup>Rider: Vikram Singh<br />Status: Available</Popup>
        </Marker>
        <Marker position={[28.6039, 77.1990]}>
          <Popup>Rider: Alex M<br />Status: Delivering</Popup>
        </Marker>
      </MapContainer>
    );
  }

  // Zones Map
  const polygon: [number, number][] = [
    [28.6139, 77.2090],
    [28.6239, 77.2190],
    [28.6339, 77.1990],
    [28.6139, 77.1890],
  ];

  return (
    <MapContainer center={[28.6239, 77.2090]} zoom={13} style={{ height: "100%", width: "100%", zIndex: 0 }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon pathOptions={{ color: 'purple' }} positions={polygon}>
        <Popup>Downtown Metro Zone</Popup>
      </Polygon>
    </MapContainer>
  );
}
