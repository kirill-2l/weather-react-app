import React from 'react'

const AddBtn = () => {
  return (
    <div className="cities-list__add-btn add-btn">
      <svg
        className="add-btn__icon"
        fill="none"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 9H20V11H11V20H9V11H0V9H9V0H11V9Z"
        />
      </svg>

      <span className="add-btn__text">Add city</span>
    </div>
  )
}

export default AddBtn;
