import React, { useState } from "react";

const RatingButtons = ({ name, ...props }) => {
  const [checked, setChecked] = useState();

  const handleClick = (e, i) => {
    e.preventDefault();
    setChecked(i);
  };

  let buttons = [];
  for (let i = 0; i <= 10; i++) {
    buttons.push(
      <button
        className={"btn-rate" + (checked === i ? " checked" : "")}
        key={i}
        onClick={(e) => handleClick(e, i)}
      >
        <input
          {...props}
          type="radio"
          name={name}
          value={i}
          checked={checked === i ? true : false}
          readOnly
        />
        <span>{i}</span>
      </button>
    );
  }

  return <>{buttons}</>;
};

export default RatingButtons;
