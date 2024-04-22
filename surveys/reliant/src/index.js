import React from "react";
import ReactDOM from "react-dom";
import config from "./setup";
import "./assets/scss/index.scss";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById(config.elementID)
);
