import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";
import DB from "../../assets/city.list.min.json";
import Autosuggest from 'react-autosuggest';

const AddCity = ({ getCity }) => {
  const [selectId, setSelectId] = useState(null);
  const [selectCountry, setSelectCountry] = useState(null);

  const countries = [...new Set(DB.map(item => item.country))].map(item => {
    return {
      value: item,
      label: item
    };
  });
  const cities = selectCountry
    ? DB.filter(({ country }) => country === selectCountry).map(item => {
        return {
          value: item.name,
          label: item.name,
          id: item.id
        };
      })
    : null;
  return (
    <div className="add-city">
      <div className="add-city__wrapper">
        <h3 className="add-city__title">Add new City to List</h3>
        <h4>Country</h4>
        <Select
          isSearchable
          isClearable
          onChange={e => (e ? setSelectCountry(e.value) : null)}
          className={"add-city__select"}
          options={countries}
        ></Select>
        {selectCountry && (
          <div>
            <h4>City</h4>
            <Select
            onChange={e => (e ? setSelectId(e.id) : null)}
            isSearchable isClearable options={cities} />
          </div>
        )}

        <button
          onClick={() => (selectId ? getCity(selectId) : false)}
          className="add-city__btn"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCity;
