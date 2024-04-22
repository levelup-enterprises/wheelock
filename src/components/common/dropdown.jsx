import React, { useState } from "react";
import { Link } from "@reach/router";
import Button from "./button";

const Dropdown = ({ title, titlePath, values, action }) => {
  const [expand, setExpand] = useState(false);

  const doAction = (value) => {
    action(value);
  };

  const toggleExpand = (e) => {
    e.preventDefault();
    if (!expand) {
      // Hide element on click anywhere but dropdown
      window.addEventListener("click", (event) => {
        if (event.target.parentElement.className) {
          const { className } = event.target.parentElement;
          if (className !== "dropdown") {
            setExpand(false);
          }
        }
      });
    }
    setExpand(!expand);
  };

  const renderValues = () => {
    return values.map((v, i) => (
      <Button
        key={i}
        text={v.name}
        className="btn btn-link dropdown-item"
        onClick={() => doAction(v.value)}
      />
    ));
  };

  return (
    <div className="dropdown">
      {titlePath ? (
        <Link to={titlePath} onClick={(e) => toggleExpand(e)}>
          {title}
        </Link>
      ) : (
        <Button
          text={title}
          className="btn btn-link"
          onClick={(e) => toggleExpand(e)}
        />
      )}
      {expand && <div className="collapse-container">{renderValues()}</div>}
    </div>
  );
};

export default Dropdown;
