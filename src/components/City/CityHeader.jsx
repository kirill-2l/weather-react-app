import React from 'react'

// import cityBg from '../../assets/img/city-bg.png';

const CityHeader = ({photo}) => {
  return (
    <div className="city__photo" style={{ backgroundImage: `url(${photo})` }}></div>
  )
}

export default CityHeader;
