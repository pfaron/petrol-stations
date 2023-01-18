import React, {useState, useEffect} from 'react';
import {MapContainer, Marker, TileLayer, useMapEvents} from 'react-leaflet';
import {getStations} from './service/station.service'
import {getIcon} from './components/CustomIcon'
import './App.css';
import 'leaflet/dist/leaflet.css';
import CustomTooltip from "./components/CustomTooltip";
import {getPrices} from "./service/price.service";
import CustomPopup from "./components/CustomPopup";
import {fuelTypes} from "./constants/FuelTypes";
import Modal from "./components/Modal";

const App = () => {
  const [stations, setStations] = useState([]);
  const [prices, setPrices] = useState([]);
  const [zoom, setZoom] = useState(14);
  const [selectedFuelType, setSelectedFuelType] = useState('E5');
  const [fuelTypesListVisible, setFuelTypesListVisible] = useState(false);
  const [addStationModalVisible, setAddStationModalVisible] = useState(false);
  const [newStationLatLng, setNewStationLatLng] = useState({})

  const closeAddStationModal = () => setAddStationModalVisible(false);

  const MapEvents = () => {
    const mapEvents = useMapEvents({
      zoomend() {
        setZoom(mapEvents.getZoom());
      },
      dblclick(event) {
        setNewStationLatLng(event.latlng);
        setAddStationModalVisible(true);
      }
    });
    return null;
  };

  const loadStations = () => {
    getStations()
      .then((res) => setStations(res.data))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    loadStations();
    getPrices()
      .then((res) => setPrices(res.data))
      .catch((e) => console.log(e))
  }, []);

  const tooltipZoomCutoff = 13;

  const renderPriceTag = (station) => {
    if (selectedFuelType === null) {
      return null
    }
    const price = prices.find(item => item.stationId === station.id && item.fuelType === selectedFuelType);
    return (<>
      {zoom > tooltipZoomCutoff && <CustomTooltip price={price} permanent={true}/>}
      {zoom <= tooltipZoomCutoff && <CustomTooltip price={price} permanent={false}/>}
    </>);
  }

  const toggleFuelTypesListVisible = () => setFuelTypesListVisible((prevState) => !prevState);

  const setNewSelectedFuelType = (fuelType) => {
    setSelectedFuelType(fuelType);
    toggleFuelTypesListVisible();
  }

  return (
    <div className="App">
      <div className='list-wrapper'>
        <div className='list-element' onClick={toggleFuelTypesListVisible}>{selectedFuelType}</div>
        {fuelTypesListVisible && fuelTypes.map((fuelType) =>
          <div className='list-element' onClick={() => setNewSelectedFuelType(fuelType)}>{fuelType}</div>)}
      </div>
      <MapContainer center={[50.023820357150576, 19.934136706408708]} zoom={zoom} scrollWheelZoom={true}
                    doubleClickZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {stations.map((station) =>
          (<Marker key={station.id} position={[station.latitude, station.longitude]} icon={getIcon(station)}>
            {renderPriceTag(station)}
            <CustomPopup station={station} prices={prices}/>
          </Marker>))}
        <MapEvents/>
      </MapContainer>
      {addStationModalVisible &&
      <Modal closeAddStationModal={closeAddStationModal} newStationLatLng={newStationLatLng}
             loadStations={loadStations}/>}
    </div>
  );
};

export default App;
