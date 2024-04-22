import React from "react";
import { Link, Match } from "@reach/router";
import { scrollToTop } from "../../services/utilities";

export const NavLink = (props) => {
  const doAction = () => {
    props.onClick ? props.onClick() : scrollToTop(true);
  };

  return (
    <Match path={props.to}>
      {({ match }) => (
        <div
          className={
            props.override
              ? props.override
              : "nav-link " + (match ? "active " : "")
          }
        >
          <Link
            to={props.to}
            onClick={() => doAction()}
            className={props.className}
          >
            {props.children}
          </Link>
        </div>
      )}
    </Match>
  );
};
