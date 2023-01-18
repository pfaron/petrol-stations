import React from 'react';
import {Popup} from "react-leaflet";
import './CustomPopup.css';
import PopupMoreDetails from "./PopupMoreDetails";
import {fuelTypes} from "../constants/FuelTypes";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapMarkerAlt, faFont} from '@fortawesome/free-solid-svg-icons'
import PriceRow from "./PriceRow";
import {getBrandLogoUrl} from "../helper/BrandLogoUrlGenerator";
import {brands} from "../constants/Brands";

const CustomPopup = ({station, prices}) => {
  const logoUrl = getBrandLogoUrl(station.brand);
  return (
    <Popup maxWidth={500}>
      <div className='info-overview'>
        <p className='station-name'>{station.name}</p>
        {brands.includes(station.brand) && <div className='icon-text'>
          <p className='station-brand'>{station.brand}</p>
          <img src={logoUrl} alt="Station logo" width="32" height="32"/>
        </div>}
        <div className='icon-text'>
          <FontAwesomeIcon icon={faMapMarkerAlt}/>
          <p className='station-address'>{station.address}</p>
        </div>
        <div>
          {fuelTypes.map((fuelType) => <PriceRow station={station} prices={prices} fuelType={fuelType}/>)}
        </div>
      </div>
      <PopupMoreDetails station={station}/>
    </Popup>);
}

export default CustomPopup;