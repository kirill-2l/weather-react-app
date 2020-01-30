import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

import DB from "../../assets/city.list.min.json";

const AddCity = ({ getCity }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const cities = DB.map(item => {
    return {
      name: item.name,
      countryId: item.id,
      country: item.country
    };
  });

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : cities.filter(
          city => city.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = suggestion => suggestion.name;

  const renderSuggestion = suggestion => {
    return (
      <div className="react-autosuggest__suggestion-item">
        <div className="react-autosuggest__suggestion-name">{suggestion.name}</div>
        <div className="react-autosuggest__suggestion-country">{suggestion.country}</div>
      </div>
    );
  };

  const handleChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const shouldRenderSuggestions = value => {
    return value.trim().length > 2;
  };
  const onSuggestionSelected = (event, { suggestion }) => {
    setSelectedId(suggestion.countryId);
  };
  const inputProps = {
    placeholder: "Type a city name",
    value,
    onChange: handleChange
  };

  return (
    <div className="add-city">
      <div className="add-city__wrapper">
        <h3 className="add-city__title">Add new City to List</h3>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          shouldRenderSuggestions={shouldRenderSuggestions}
          highlightFirstSuggestion={true}
          onSuggestionSelected={onSuggestionSelected}
        />
        <button
          onClick={() => (selectedId ? getCity(selectedId) : false)}
          className="add-city__btn"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCity;
