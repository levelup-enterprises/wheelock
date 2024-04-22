/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";

const Select = ({
  label,
  name,
  values,
  selected,
  required,
  fullWidth,
  clear,
  register,
  onChange,
  error,
  override,
  ...rest
}) => {
  const [value, setValue] = useState(
    selected !== undefined ? selected : values[0].id
  );

  useEffect(() => {
    clear && setValue(undefined);
  }, [clear]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange && onChange(e);
  };

  return (
    <>
      <div
        className={
          "form-group" +
          (fullWidth ? " full-width" : "") +
          (error ? " error" : "")
        }
      >
        <label htmlFor={name}>
          {label} {required && <span className="required">*</span>}
        </label>
        <select
          id={name}
          name={name}
          ref={register}
          value={value}
          {...rest}
          onChange={(e) => handleChange(e)}
          placeholder={error && error}
        >
          {values &&
            values.map((value) => (
              <option key={value.id} value={value.id}>
                {value.name}
              </option>
            ))}
        </select>
        {error && <span className="error">{error}</span>}
      </div>
    </>
  );
};

export default Select;
