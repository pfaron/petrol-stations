import React from 'react';
import {Tooltip} from "react-leaflet";
import './CustomTooltip.css'
import {numberFormatter} from "../helper/Formatters";

const CustomTooltip = ({ price, permanent }) => {
  return <Tooltip direction='bottom' offset={[0, 32]} opacity={1} permanent={permanent}>
    {price ? `${numberFormatter.format(price.price)}zł` : '-'}
  </Tooltip>
}

export default CustomTooltip