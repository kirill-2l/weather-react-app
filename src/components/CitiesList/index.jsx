import React from "react";
import classNames from "classnames";

import AddBtn from "../AddBtn";

const CitiesList = ({ citiesList, onClickItem, activeItem }) => {
  return (
    <div className="sidebar__list cities-list">
      <ul className="cities-list__block">
        {citiesList.map(item => {
          return (
            <li
              onClick={() => onClickItem(item)}
              key={item.cityId}
              className={classNames("cities-list__item", {
                "cities-list__item--active":
                  activeItem && item.id === activeItem.id
              })}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
      <AddBtn />
    </div>
  );
};

export default CitiesList;
