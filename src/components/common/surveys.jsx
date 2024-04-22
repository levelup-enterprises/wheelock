import React from "react";
import Button from "../common/button";

const Survey = ({ question, img, choices, choose, ...rest }) => (
  <div className="survey-container" {...rest}>
    <h1>{question}</h1>
    <img src={img} alt="Question" />
    <div className="options-wrapper">
      {choices &&
        choices.map((value) => (
          <Button
            className="btn"
            key={value.id}
            text={value.text}
            onClick={() => choose(value.id)}
          />
        ))}
    </div>
  </div>
);

export default Survey;
