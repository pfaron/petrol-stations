import {brands} from "../constants/Brands";

export const getBrandLogoUrl = (brand) => {
  return brands.includes(brand) ? `/${brand.toLowerCase()}_logo.png` : '/other_logo.png';
}