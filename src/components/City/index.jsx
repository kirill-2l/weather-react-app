import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import CityHeader from "./CityHeader";

const City = ({ cities }) => {

  const formateTime = (unixTime) => {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }

  return (
    <Fragment>
      {cities.map(city => {
        return (
          <Route key={city.cityId} path={`/city/${city.cityId}`}>
            <CityHeader photo={city.photo} />
            <div className="city__content">
              <div className="city__header">
                <div className="city__header-name">{city.name}</div>
              </div>
              <div className="city__body">
                <div className="city__text-block">
                  <div className="city__text-title">{city.title}</div>
                  <div className="city__text-descr">{city.description}</div>
                </div>
                <div className="city__time">{`UTC ${city.timezone > 0 ? `+${city.timezone / 3600}` : `${city.timezone / 3600}`}`}</div>
                <div className="city__props-block">
                  <ul className="city__props-list">
                    <li className="city__props-item">
                      <span className="city__prop">Temp</span>
                      <span className="city__prop-value">
                        {Math.ceil(city.temp - 273.15)}&#176;
                      </span>
                    </li>
                    <li className="city__props-item">
                      <span className="city__prop">Feels like</span>
                      <span className="city__prop-value">
                        {Math.ceil(city.feelsLike - 273.15)}&#176;
                      </span>
                    </li>
                    <li className="city__props-item">
                      <span className="city__prop">Wind speed</span>
                      <span className="city__prop-value">
                        {Math.ceil(city.windSpeed)} m/s
                      </span>
                    </li>
                  </ul>
                  <ul className="city__props-list">
                    <li className="city__props-item">
                      <span className="city__prop">Sunrise</span>
                      <span className="city__prop-value">
                        {formateTime(city.sunrise)}
                      </span>
                    </li>
                    <li className="city__props-item">
                      <span className="city__prop">Sunset</span>
                      <span className="city__prop-value">
                      {formateTime(city.sunset)}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Route>
        );
      })}
    </Fragment>
  );
};

export default City;
