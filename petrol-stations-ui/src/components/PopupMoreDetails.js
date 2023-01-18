import React, {useEffect, useState} from "react";
import {getPricesForStation} from "../service/price.service";
import './PopupMoreDetails.css';
import {dateFormatter, numberFormatter} from "../helper/Formatters";
import {
  faArrowRotateForward
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PopupMoreDetails = ({station}) => {
  const [priceHistory, setPriceHistory] = useState([])

  const mostRecentFirstSorter = (a, b) => (a.addedDate > b.addedDate) ? -1 : (a.addedDate < b.addedDate) ? 1 : 0;

  useEffect(() => {
    getPricesForStation(station.id)
      .then((res) => setPriceHistory(res.data.sort(mostRecentFirstSorter)))
      .catch((e) => console.log(e));
  }, []);

  const reloadData = (event) => {
    getPricesForStation(station.id)
      .then((res) => setPriceHistory(res.data.sort(mostRecentFirstSorter)))
      .catch((e) => console.log(e));
  }

  return (
    <div className='main-container'>
      <FontAwesomeIcon className='refresh-data' onClick={reloadData} icon={faArrowRotateForward}/>
      <div className='table-container'>
        <table>
          {priceHistory.map((priceRecord) =>
            <tr>
              <td>{dateFormatter.format(new Date(priceRecord.addedDate))}</td>
              <td>{priceRecord.fuelType}</td>
              <td>{`${numberFormatter.format(priceRecord.price)}zł`}</td>
              <td className='up-vote-count'>{`+${priceRecord.upVotes}`}</td>
              <td className='down-vote-count'>{`-${priceRecord.downVotes}`}</td>
            </tr>
          )}
        </table>
      </div>
    </div>);
}

export default PopupMoreDetails;