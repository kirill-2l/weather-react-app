import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";

import Logo from "./components/Logo";
import CitiesList from "./components/CitiesList";
import City from "./components/City";

function App() {
  const [cities, setCities] = useState(null);
  const [activeItem, setActiveItem] = useState(1);
  useEffect(() => {
    axios.get("http://localhost:3001/cities/").then(({ data }) => {
      setCities(data);
    });
  }, []);

  const getCities = () => {
    const apiKey = "e9f4e35f4de8fa1f2f0a9fb7e73e642c";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=${apiKey}`
      )
      .then(({ data }) => {
        setCities({
          name: data.name,
          timezone: data.timezone,
          windSpeed: data.wind.speed,
          temp: data.main.temp,
          feelsLike: data.main.feels_like,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset
        });
      });
  };

  return (
    <div className="weather-app">
      <Route exact path="/">
        <div className="weather-app__sidebar sidebar">
          <Logo />

          {cities && (
            <CitiesList
              activeItem={activeItem}
              cities={cities.map(city => {
                return {
                  id: city.id,
                  name: city.name,
                  activeItem: Number(city.id) === activeItem ? true : false
                };
              })}
            />
          )}
        </div>
      </Route>
      <div className="weather-app__main city">
        {cities && <City cities={cities}/>}
      </div>
    </div>
  );
}

export default App;
