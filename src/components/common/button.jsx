import React from "react";

const Button = ({ text, children, ...rest }) => (
  <button {...rest}>
    {text}
    {children}
  </button>
);

export default Button;
