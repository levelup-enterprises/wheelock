import React, { useEffect } from "react";

const FormTest = ({ id }) => {
  const includejQuery = () => {
    const script = document.createElement("script");
    script.src = process.env.REACT_APP_FORMS_URL + "assets/jquery.min.js";
    script.async = false;
    document.head.appendChild(script);
  };

  const includeTest = () => {
    const script = document.createElement("script");
    script.src = process.env.REACT_APP_FORMS_URL + "js/" + id;
    script.async = false;
    document.body.appendChild(script);
  };

  useEffect(() => {
    id && includejQuery();
    id && includeTest();
  });

  window.wheelockSurvey && console.log(window.wheelockSurvey);

  return <main className="login"></main>;
};

export default FormTest;
