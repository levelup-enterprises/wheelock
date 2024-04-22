import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./context/user";
import { DataProvider } from "./context/data";
import { SearchProvider } from "./context/search";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
// Styles
import "./assets/css/fontawesome/css/all.min.css";
import "./assets/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <DataProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </DataProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
