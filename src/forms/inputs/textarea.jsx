/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";

const Textarea = ({
  label,
  name,
  small,
  placeholder,
  required,
  fullWidth,
  notEmpty,
  register,
  error,
  ...rest
}) => {
  const [empty, setEmpty] = useState(true);

  const handleChange = (e) => {
    e.target.value !== "" ? setEmpty(false) : setEmpty(true);
  };

  return (
    <>
      <div
        className={
          "form-group" +
          (fullWidth ? " full-width" : "") +
          (error ? " error" : "") +
          (!empty ? " not-empty" : "")
        }
      >
        <label htmlFor={name}>
          {label} {required && <span className="required">*</span>}
        </label>
        {small && <small>{small}</small>}
        <textarea
          id={name}
          name={name}
          ref={register}
          {...rest}
          placeholder={error ? error : placeholder}
          onChange={(e) => handleChange(e)}
        />
        {error && !empty && <span className="error">{error}</span>}
      </div>
    </>
  );
};

export default Textarea;
