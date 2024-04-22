import React from "react";
import { scrollToTop } from "../services/utilities";
import Button from "./common/button";
import BottomNav from "./bottom-nav";

const Footer = ({ user, props }) => {
  const summary = props.location.pathname === "/summary" ? true : false;
  return (
    <footer>
      <Button
        className="btn return-top"
        text="Return to top"
        onClick={() => scrollToTop()}
      />
      <div className={"version-info" + (summary ? " pb-5" : "")}>
        version {process.env.REACT_APP_VERSION}
      </div>
      {summary && user.role !== "guest" && <BottomNav />}
    </footer>
  );
};

export default Footer;
