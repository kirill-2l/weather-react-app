import React, { Fragment } from 'react'

import CityHeader from './CityHeader';


const City = ({ cities }) => {
  return (
    <Fragment>
      <CityHeader />
      {cities.map(city => {
        return (
          <div key={city.id} className="city__content">
            <div className="city__header">
              <div className="city__header-name">{city.name}</div>
              <div className="city__header-icon"></div>
            </div>
            <div className="city__body">
              <div className="city__time">21:00</div>
              <div className="city__props-block">
                <ul className="city__props-list">
                  <li className="city__props-item">
                    <span className="city__prop">Temp</span>
                    <span className="city__prop-value">{Math.ceil((city.temp - 32) * 5 / 9)}</span>
                  </li>
                  <li className="city__props-item">
                    <span className="city__prop">Feels like</span>
                    <span className="city__prop-value">{Math.ceil((city.feelsLike - 32) * 5 / 9)}</span>
                  </li>
                  <li className="city__props-item">
                    <span className="city__prop">Wind speed</span>
                    <span className="city__prop-value">{city.windSpeed}</span>
                  </li>
                </ul>
                <ul className="city__props-list">
                  <li className="city__props-item">
                    <span className="city__prop">Sunrise</span>
                    <span className="city__prop-value">{city.sunrise}</span>
                  </li>
                  <li className="city__props-item">
                    <span className="city__prop">Sunset</span>
                    <span className="city__prop-value">{city.sunset}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
      })}

    </Fragment>
  )
}

export default City;
