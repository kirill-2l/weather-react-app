import React, {useState} from "react";
import Select from "react-select";

const Input = () => {
  const [selectVal, setSelectValue] = useState(null);
  const options = [
    { value: "Moscow", label: "Moscow", id: 123 },
    { value: "Novosibirsk", label: "Novosibirsk", id: 124 },
    { value: "Kiev", label: "Kiev", id: 125 }
  ];
  return (
    <div className="add-city">
      <div className="add-city__wrapper">
        <h3 className="add-city__title">Add new City to List</h3>
        <Select
          isSearchable
          isClearable
          onChange={() => {console.log(setSelectValue(this.value))}}
          value={setSelectValue}
          className={"add-city__select"}
          options={options}
        />
        <button onClick={() =>{console.log(selectVal)} } className="add-city__btn">Add</button>
      </div>
    </div>
  );
};

export default Input;
