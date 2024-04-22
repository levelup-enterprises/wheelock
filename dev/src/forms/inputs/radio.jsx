import React, { useState, useEffect } from "react";

const Radio = ({
  label,
  name,
  values,
  selected,
  clear,
  required,
  fullWidth,
  register,
  error,
  ...rest
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    clear && setValue("");
  }, [clear]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={"form-group" + (error ? " error" : "")}>
      <label>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      {typeof values === "object" ? (
        values.map((value) => (
          <div
            className={
              "inline-wrapper" +
              (fullWidth ? " full-width" : "") +
              (error ? " error" : "")
            }
            key={value.value}
          >
            <input
              type="radio"
              id={value.id}
              name={value.name}
              ref={register}
              value={value.value}
              {...rest}
              onChange={(e) => handleChange(e)}
              placeholder={error && error}
            />
            <label htmlFor={value.id}>{value.value}</label>
          </div>
        ))
      ) : (
        <div
          className={
            "inline-wrapper" +
            (fullWidth ? " full-width" : "") +
            (error ? " error" : "")
          }
        >
          <input
            id={name}
            name={name}
            ref={register}
            value={values}
            {...rest}
            onChange={(e) => handleChange(e)}
            placeholder={error && error}
          />
          <label htmlFor={name}>{label}</label>
          {error && <span className="error">{error}</span>}
        </div>
      )}
    </div>
  );
};

const RadioInline = ({
  label,
  name,
  values,
  selected,
  clear,
  required,
  fullWidth,
  register,
  error,
  ...rest
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    clear && setValue("");
  }, [clear]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={"form-group" + (error ? " error" : "")}>
      {/* <label>
          {label}
          {required && <span className="required"> *</span>}
        </label> */}
      {typeof values === "object" ? (
        values.map((value) => (
          <div
            className={"inline-wrapper" + (fullWidth ? " full-width" : "")}
            key={value.value}
          >
            <input
              type="radio"
              id={value.id}
              name={value.name}
              ref={register}
              value={value.value}
              {...rest}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor={value.id}>{value.value}</label>
          </div>
        ))
      ) : (
        <div
          className={
            "inline-wrapper" +
            (fullWidth ? " full-width" : "") +
            (error ? " error" : "")
          }
        >
          <input
            type="radio"
            id={name}
            name={name}
            ref={register}
            value={values}
            {...rest}
            onChange={(e) => handleChange(e)}
            placeholder={error && error}
          />
          <label htmlFor={name}>{label}</label>
          {error && <span className="error">{error}</span>}
        </div>
      )}
    </div>
  );
};

export default { Radio, RadioInline };
