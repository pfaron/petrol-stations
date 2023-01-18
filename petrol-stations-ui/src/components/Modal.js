import React, {useState} from 'react';
import './Modal.css';
import {addStation} from "../service/station.service";
import {brands} from "../constants/Brands";
import {getBrandLogoUrl} from "../helper/BrandLogoUrlGenerator";

const Modal = ({closeAddStationModal, newStationLatLng, loadStations}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [brand, setBrand] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let brandTemp = brand;
    if (!brands.includes(brandTemp)) {
      brandTemp = 'Other';
    }
    const {lat, lng} = newStationLatLng;
    addStation({
      brand: brandTemp,
      name: name,
      address: address,
      latitude: lat,
      longitude: lng,
    }).then(() => {
      loadStations()
      closeAddStationModal();
    });
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <form className='add-station-form' onSubmit={handleSubmit}>
          <div className='add-station-form-fields-container'>
            <label className='label-field-container'>
              <input required={true} placeholder='Nazwa stacji' type="text" value={name}
                     onChange={e => setName(e.target.value)}/>
            </label>
            <label className='label-field-container'>
              <input required={true} placeholder='Ulica' type="text" value={address}
                     onChange={e => setAddress(e.target.value)}/>
            </label>
            <label className='label-field-container'>
              <img src={getBrandLogoUrl(brand)} alt="Station logo" width="24" height="24"/>
              <select value={brand} onChange={e => setBrand(e.target.value)}>
                <option value='Inna'>Inna</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className='close-submit-container'>
            <button type="submit">Submit</button>
            <button onClick={closeAddStationModal}>Close</button>
          </div>
        </form>
      </div>
    </div>)
}

export default Modal;