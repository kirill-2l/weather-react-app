import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";

import { Logo, CitiesList, City, AddCity } from "./components";

function App() {
  const [citiesList, setCitiesList] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  let history = useHistory();

  // useEffect(() => {
  //   axios.get("http://localhost:3001/cities/").then(({ data }) => {
  //     setCitiesList(data);
  //   });
  // }, []);

  const getWeather = async cityId => {
    const apiKey = "e9f4e35f4de8fa1f2f0a9fb7e73e642c";
    try {
      let res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const getPhoto = async cityName => {
    const apiKey =
      "b5cfa9a93266cdd8a6ea18e70aa719f9528a09f66a96b8a45bf2d90342c42ea2";
    try {
      let res = await axios.get(
        `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${cityName} building&orientation=landscape`
      );
      console.log(res.data);
      return res.data.results;
    } catch (e) {
      console.log(e);
    }
  };

  const addCity = async cityId => {
    if (citiesList && citiesList.find(item => item.cityId === cityId)) {
      alert("This city has been already added to cities list");
      return;
    }
    let weather = await getWeather(cityId);
    let photo = await getPhoto(weather.name);
    const newItem = {
      name: weather.name,
      timezone: weather.timezone,
      windSpeed: weather.wind.speed,
      temp: weather.main.temp,
      feelsLike: weather.main.feels_like,
      sunrise: weather.sys.sunrise,
      sunset: weather.sys.sunset,
      title: weather.weather[0].main,
      description: weather.weather[0].description,
      cityId: weather.id,
      photo: photo[Math.ceil(Math.random() * 5)].urls.regular
    };
    if (newItem) {
      const newList = citiesList ? [...citiesList, newItem] : [newItem];
      setCitiesList(newList);
    }
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
