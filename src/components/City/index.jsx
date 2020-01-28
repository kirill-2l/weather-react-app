import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import CityHeader from "./CityHeader";

const City = ({ cities }) => {
  return (
    <Fragment>
      <CityHeader />
      {cities.map(city => {
        return (
          <Route key={city.id} path={`/city/${city.id}`}>
            <div className="city__content">
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
                      <span className="city__prop-value">
                        {Math.ceil(city.temp - 273.15)}
                      </span>
                    </li>
                    <li className="city__props-item">
                      <span className="city__prop">Feels like</span>
                      <span className="city__prop-value">
                        {Math.ceil(city.feelsLike - 273.15)}
                      </span>
                    </li>
                    <li className="city__props-item">
                      <span className="city__prop">Wind speed</span>
                      <span className="city__prop-value">{city.windSpeed}</span>
                    </li>
                  </ul>
                  <ul className="city__props-list">
                    <li className="city__props-item">
                      <span className="city__prop">Sunrise</span>
                      <span className="city__prop-value">
                        {new Date(city.sunrise * 1000)
                          .toISOString()
                          .substr(11, 8)}
                      </span>
                    </li>
                    <li className="city__props-item">
                      <span className="city__prop">Sunset</span>
                      <span className="city__prop-value">
                        {new Date(city.sunset * 1000)
                          .toISOString()
                          .substr(11, 8)}
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
