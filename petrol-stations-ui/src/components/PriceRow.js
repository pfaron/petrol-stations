import React, {useState} from 'react';
import './PriceRow.css';
import {numberFormatter} from "../helper/Formatters";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faThumbsUp,
  faThumbsDown,
  faCircleArrowRight,
  faXmarkCircle,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import {addPrice, downVote, upVote} from "../service/price.service";

const PriceRow = ({station, prices, fuelType}) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const openEditMode = (event) => {
    event.stopPropagation();
    setEditMode(true);
  }
  const closeEditMode = (event) => {
    event.stopPropagation();
    setEditMode(false);
  }

  const handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setEditMode(false);
    if (inputValue !== '') {
      addPrice({
        stationId: station.id,
        fuelType: fuelType,
        price: inputValue,
        currency: 'PLN',
      })
      setSubmitted(true);
    }
  };

  const [selectedVote, setSelectedVote] = useState(null);

  const handleUpVote = () => {
    setSelectedVote('up');
    upVote(price.priceRecordId);
  }

  const handleDownVote = () => {
    setSelectedVote('down');
    downVote(price.priceRecordId);
  }

  const price = prices.find((price) => price.stationId === station.id && price.fuelType === fuelType);

  return (
    <div className='price-row'>
      <p>{fuelType}</p>
      {!editMode &&
      <div className='price-actions-container'>
        {submitted ? <>
            <p className='strikethrough-old-price'>{price ? `${numberFormatter.format(price.price)}zł` : '-'}</p>
            <FontAwesomeIcon icon={faArrowRight}/>
            <p>{numberFormatter.format(Number(inputValue))}zł</p>
          </> :
          <p>{price ? `${numberFormatter.format(price.price)}zł` : '-'}</p>}
        <button className='icon-button'>
          {!submitted && (selectedVote === null ?
              (price ? (<>
                  <FontAwesomeIcon className='up-vote-button' onClick={handleUpVote} icon={faThumbsUp}/>
                  <FontAwesomeIcon className='down-vote-button' onClick={handleDownVote} icon={faThumbsDown}/>
                </>) :
                (<>
                  <FontAwesomeIcon className='up-vote-button-disabled' icon={faThumbsUp}/>
                  <FontAwesomeIcon className='down-vote-button-disabled' icon={faThumbsDown}/>
                </>))
              : selectedVote === 'up' ?
                (<>
                  <FontAwesomeIcon className='up-vote-button-selected' icon={faThumbsUp}/>
                  <FontAwesomeIcon className='down-vote-button-disabled' icon={faThumbsDown}/>
                </>) :
                (<>
                  <FontAwesomeIcon className='up-vote-button-disabled' icon={faThumbsUp}/>
                  <FontAwesomeIcon className='down-vote-button-selected' icon={faThumbsDown}/>
                </>)
          )}
          {submitted ? <FontAwesomeIcon className='edit-button-disabled' icon={faPencil}/> :
            <FontAwesomeIcon className='edit-button' onClick={openEditMode} icon={faPencil}/>}
        </button>
      </div>}
      {editMode && <form className='form-field' onSubmit={handleSubmit}>
        <input
          className='input-field'
          type="number"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={closeEditMode} className='icon-button'><FontAwesomeIcon className='cancel-button'
                                                                                 icon={faXmarkCircle}/></button>
        <button className='icon-button' type="submit"><FontAwesomeIcon className='submit-button'
                                                                       icon={faCircleArrowRight}/></button>
      </form>}
    </div>
  );
}

export default PriceRow;