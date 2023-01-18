import L from "leaflet";
import {getBrandLogoUrl} from "../helper/BrandLogoUrlGenerator";

export const getIcon = (station) => {
  const url = getBrandLogoUrl(station.brand);
  return new L.Icon({
    iconUrl: url,
    iconSize: [32, 32],
    iconAnchor: [16, 0],
    shadowUrl: '/shadow.png',
    shadowSize: [32, 6],
    shadowAnchor: [16, -32]
  });
}