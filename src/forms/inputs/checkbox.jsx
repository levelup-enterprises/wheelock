import React, { useState, useEffect } from "react";

const Checkbox = ({
  label,
  name,
  required,
  fullWidth,
  blockView,
  checked,
  inline = true,
  onChange,
  clear,
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
    const change = e.target.checked;
    change !== "" ? setEmpty(false) : setEmpty(true);
    onChange && onChange(change);
  };

  return (
    <>
      <div
        className={
          "form-group" +
          (inline ? " inline" : "") +
          (blockView ? " block-checkbox" : "") +
          (fullWidth ? " full-width" : "") +
          (error ? " error" : "") +
          (!empty ? " not-empty" : "")
        }
      >
        <input
          type="checkbox"
          id={name}
          name={name}
          value={register ? undefined : value}
          ref={register}
          defaultChecked={checked}
          onChange={(e) => handleChange(e)}
          {...rest}
        />
        <label htmlFor={name}>
          {label} {required && <span className="required">*</span>}
        </label>
        {error && !empty && <span className="error">{error}</span>}
      </div>
    </>
  );
};

export default Checkbox;
