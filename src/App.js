import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";

import { Logo, CitiesList, City, AddCity } from "./components";

function App() {
  const [citiesList, setCitiesList] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:3001/cities/").then(({ data }) => {
      setCitiesList(data);
    });
  }, []);

  const addCity = cityId => {
    const apiKey = "e9f4e35f4de8fa1f2f0a9fb7e73e642c";
    if (citiesList.find(item => item.cityId === cityId)) {
      alert("This city has been already added to cities list");
      return;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`
      )
      .then(({ data }) => {
        console.log(data);
        const newItem = {
          name: data.name,
          timezone: data.timezone,
          windSpeed: data.wind.speed,
          temp: data.main.temp,
          feelsLike: data.main.feels_like,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          title:data.weather[0].main,
          description:data.weather[0].description,
          icon: data.weather[0].icon,
          cityId: data.id
        };
        axios.post("http://localhost:3001/cities", newItem);
        return newItem;
      })
      .then(newItem => {
        const newList = [...citiesList, newItem];
        setCitiesList(newList);
      })
      .catch(e => alert(e))
      .finally(() => console.log("complete"));
  };

  useEffect(() => {
    const activeCityId = history.location.pathname.split("city/")[1];
    if (citiesList) {
      const activeCity = citiesList.find(
        city => city.cityId === Number(activeCityId)
      );
      setActiveItem(activeCity);
    }
  }, [citiesList, history.location.pathname]);

  return (
    <div className="weather-app">
      <div className="weather-app__sidebar sidebar">
        <Logo />
        {citiesList && (
          <CitiesList
            activeItem={activeItem}
            onClickItem={citiesList => {
              history.push(`/city/${citiesList.cityId}`);
            }}
            citiesList={citiesList.map(item => {
              return {
                cityId: item.cityId,
                name: item.name,
                activeItem: Number(item.cityId) === activeItem ? true : false
              };
            })}
          />
        )}
      </div>
      <div className="weather-app__main city">
        <Route exact path="/">
          <AddCity addCity={addCity} />
        </Route>
        <Route path="/city/">
          {citiesList && <City cities={citiesList} />}
        </Route>
      </div>
    </div>
  );
}

export default App;
