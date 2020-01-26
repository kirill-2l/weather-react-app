import React from 'react';
import classNames from 'classnames';

import AddBtn from '../AddBtn';

const CitiesList = ({ cities, activeItem }) => {
  console.log(cities)
  return (
    <div className="sidebar__list cities-list">
      <ul className="cities-list__block">
        {
          cities.map(item => {
            return <li key={item.id} className={classNames('cities-list__item', { 'cities-list__item--active': item.activeItem })}>{item.name}</li>
          })
        }
      </ul>
      <AddBtn />
    </div>
  )
}

export default CitiesList;
