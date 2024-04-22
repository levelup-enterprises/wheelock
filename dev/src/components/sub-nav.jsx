/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useContext } from "react";
import { DataContext } from "../context/data";
import DatePicker from "./common/date-picker";
import { NavLink } from "./common/navlink";
import Button from "./common/button";
import Search from "./search";
import session from "../services/session";

export const SubNav = ({ props }) => {
  const { data } = useContext(DataContext);
  const [show, toggleShow] = useState(false);

  const launchDatePicker = () => {
    toggleShow(!show);
  };

  const resetComments = () => {
    session.remove("comments");
    window.location.href = "/comments";
  };

  return (
    <>
      <nav
        className={
          "navbar navbar-expand post-nav" +
          (props.location.pathname === "/comments" ? " comments" : "")
        }
      >
        <div className="navbar-collapse post-menu-index" id="navbarPostMenu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/summary">Summary</NavLink>
            </li>

            {props.location.pathname.startsWith("/comments/") ? (
              <li className="nav-item">
                <Button
                  className="btn btn-link reset-custom"
                  onClick={() => resetComments()}
                >
                  Comments{" "}
                  <span>
                    <b>&#8617;</b> head back
                  </span>
                </Button>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink to="/comments">Comments</NavLink>
              </li>
            )}
          </ul>
          {props.location.pathname === "/comments" && (
            <ul className="navbar-nav full-width search-container">
              <li className=" nav-item flex-grow-1">
                <Search />
              </li>
            </ul>
          )}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-2">
              <span className="nav-link" id="subDateDisplay">
                {data.dateRange}
              </span>
            </li>
            <li className="nav-item dropdown">
              <Button
                className="btn"
                id="dateRange"
                onClick={() => launchDatePicker()}
              >
                <i className="far fa-calendar-alt"></i>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
      <DatePicker show={show} toggle={() => toggleShow(false)} />
    </>
  );
};

export default SubNav;
