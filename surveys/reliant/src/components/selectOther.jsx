import React from "react";

const Select = ({ name, values, defaultOption = "Select...", showOther }) => {
  const setValue = (e) => {
    e.target.value === "Other" ? showOther(true) : showOther(false);
  };

  let options = null;
  if (values.length > 0) {
    options =
      typeof values[0] === "object"
        ? Object.values(values).map((v, i) => (
            <option value={v.value} key={i}>
              {v.name}
            </option>
          ))
        : values.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ));
  }

  return (
    <select
      name={name}
      className="form-control"
      id={"wheelock-" + name}
      onChange={(e) => setValue(e)}
    >
      <option value="N/A" defaultValue>
        {defaultOption}
      </option>
      {options}
    </select>
  );
};
export default Select;
