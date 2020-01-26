import React from 'react'

import cityBg from '../../assets/img/city-bg.png';

const CityHeader = () => {
  return (
    <div className="city__photo" style={{ backgroundImage: `url(${cityBg})` }}></div>
  )
}

export default CityHeader;
