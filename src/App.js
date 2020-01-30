import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";

import { Logo, CitiesList, City, AddCity } from "./components";

function App() {
  const [list, setList] = useState(null);
  const [cities, setCities] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const listId = history.location.pathname.split("city/")[1];
    if (list) {
      const activeList = list.find(list => list.id === Number(listId));
      setActiveItem(activeList);
    }
  }, [list, history.location.pathname]);

  useEffect(() => {
    axios.get("http://localhost:3001/list/").then(({ data }) => {
      setList(data);
    });
    axios.get("http://localhost:3001/cities/").then(({ data }) => {
      setCities(data);
    });
  }, []);

  const getCity = cityId => {
    const apiKey = "e9f4e35f4de8fa1f2f0a9fb7e73e642c";
    if (list.includes(cityId)) {
      console.log("Error");
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`
      )
      .then(({ data }) => {
        const newItem = {
          name: data.name,
          timezone: data.timezone,
          windSpeed: data.wind.speed,
          temp: data.main.temp,
          feelsLike: data.main.feels_like,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          cityId: cityId
        };
        const newList = [...list, newItem];
        setList(newList);
        console.log(list);
      });
  };

  return (
    <div className="weather-app">
      <div className="weather-app__sidebar sidebar">
        <Logo />
        {list && (
          <CitiesList
            activeItem={activeItem}
            onClickItem={list => {
              history.push(`/city/${list.id}`);
            }}
            list={list.map(item => {
              return {
                id: item.id,
                name: item.name,
                activeItem: Number(item.id) === activeItem ? true : false
              };
            })}
          />
        )}
      </div>
      <div className="weather-app__main city">
        <Route exact path="/">
          <AddCity getCity={getCity} />
        </Route>
        <Route path="/city/">{cities && <City cities={cities} />}</Route>
      </div>
    </div>
  );
}

export default App;
