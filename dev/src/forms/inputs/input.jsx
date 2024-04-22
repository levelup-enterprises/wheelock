import React, { useState, useEffect } from "react";
import { formatPhoneNum, formatZipCode } from "../../services/utilities";

const Input = ({
  type = "text",
  label,
  name,
  placeholder,
  required,
  fullWidth,
  clear,
  small,
  onChange,
  register,
  error,
  ...rest
}) => {
  const [value, setValue] = useState("");
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    clear && setValue("");
  }, [clear]);

  const handleChange = (e) => {
    const change = e.target.value;
    let newValue = "";
    switch (type) {
      case "phone":
        newValue = formatPhoneNum(change);
        setValue(newValue);
        break;
      case "zipcode":
        newValue = formatZipCode(change);
        setValue(newValue);
        break;
      default:
        newValue = change;
        setValue(newValue);
    }
    change !== "" ? setEmpty(false) : setEmpty(true);
    onChange && onChange(newValue);
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
        <input
          type={type}
          id={name}
          name={name}
          value={register ? undefined : value}
          ref={register}
          onChange={(e) => handleChange(e)}
          placeholder={error ? error : placeholder}
          {...rest}
        />
        {error && !empty && <span className="error">{error}</span>}
        {small && <small className="muted">{small}</small>}
      </div>
    </>
  );
};

export default Input;
