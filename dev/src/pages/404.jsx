import React from "react";
import moveIt from "../assets/images/move-along.gif";
import { Link } from "@reach/router";

const NotFound = () => (
  <main className="error-404">
    <h1>404</h1>
    <h3>Theres nothing to see here.</h3>
    <div className="container main-logo py-5">
      <img
        src={moveIt}
        alt="404"
        title="Theres nothing to see here"
        className="image-404"
      ></img>
    </div>
  </main>
);

export default NotFound;
