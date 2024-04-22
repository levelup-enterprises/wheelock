import React from "react";

const Button = ({ text, children, action, ...rest }) => {
  const clickAction = (e) => {
    e.preventDefault();
    action && action(e);
  };

  return (
    <button {...rest} onClick={(e) => clickAction(e)}>
      {text}
      {children}
    </button>
  );
};

export default Button;
