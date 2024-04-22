import React, { useState } from "react";

const AccomplishRadios = ({ radioLabels }) => {
  const [checked1, setchecked1] = useState(false);
  const [checked2, setchecked2] = useState(false);

  const clickAction = (e, value) => {
    e.preventDefault();
    if (value === 1) {
      setchecked1(true);
      setchecked2(false);
    } else {
      setchecked2(true);
      setchecked1(false);
    }
  };

  return (
    <>
      <div className="form-check form-check-inline">
        <button
          className={"btn btn-radio" + (checked1 ? " checked" : "")}
          onClick={(e) => clickAction(e, 1)}
        >
          <input
            type="radio"
            className="form-check-input hide-this"
            name="accomplish"
            id="wheelock-yes"
            value="yes"
            checked={checked1}
            readOnly
          />
          <label className="form-check-label" htmlFor="inlineRadio-1">
            {radioLabels ? radioLabels[0] : "Yes"}
          </label>
        </button>
      </div>
      <div className="form-check form-check-inline">
        <button
          className={"btn btn-radio" + (checked2 ? " checked" : "")}
          onClick={(e) => clickAction(e, 2)}
        >
          <input
            type="radio"
            className="form-check-input hide-this"
            name="accomplish"
            id="wheelock-no"
            value="no"
            checked={checked2}
            readOnly
          />
          <label className="form-check-label" htmlFor="inlineRadio-2">
            {radioLabels ? radioLabels[1] : "No"}
          </label>
        </button>
      </div>
    </>
  );
};

export default AccomplishRadios;
