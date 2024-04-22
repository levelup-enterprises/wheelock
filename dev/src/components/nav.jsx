/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect, useCallback, useContext } from "react";
import { setWorkspace } from "../services/post";
import { getWorkspaces } from "../services/get";
import { UserContext } from "../context/user";
import { DataContext } from "../context/data";
import { logout } from "../services/auth";
import { NavLink } from "./common/navlink";
import { SubNav } from "./sub-nav";
import session from "../services/session";
import logo from "../assets/images/wheelLock-08.png";
import Button from "./common/button";
import Dropdown from "./common/dropdown";
import Footer from "./footer";

export const Nav = (props) => {
  const { updateUser } = useContext(UserContext);
  const { updateData } = useContext(DataContext);
  const { user } = props;

  const [collapse, toggleCollapse] = useState(false);
  const [expandCollapsed, toggleExpandCollapsed] = useState(false);
  const [brands, updateBrands] = useState(null);
  const [allWorkspaces, updateWorkspaces] = useState(null);
  const [currentWorkspace, updateWorkspace] = useState(null);
  const [hideAll, toggleHideAll] = useState(false);

  // Return to login page
  !user.loggedIn && window.location.replace("/login");

  const getCurrentWorkspace = useCallback(async () => {
    let thisWorkspace = session.get("workspace");
    let workSpaces = session.get("workspaces");

    if (!thisWorkspace) {
      const { success } = await getWorkspaces();
      if (success) {
        workSpaces = success;
        thisWorkspace = success.workspaces[user.workspace.brand];
        session.set("workspace", thisWorkspace);
        session.set("workspaces", success);
      }
    }

    updateBrands(
      Object.values(workSpaces.brands).map((brand) => ({
        name: brand,
        value: brand,
      }))
    );
    updateWorkspace(thisWorkspace);
    updateWorkspaces(workSpaces);
  }, []);

  useEffect(() => {
    getCurrentWorkspace();
  }, [getCurrentWorkspace]);

  useWindowSize();

  function useWindowSize() {
    useEffect(() => {
      function handleResize() {
        window.innerWidth < 770 ? toggleCollapse(true) : toggleCollapse(false);
      }

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);
  }

  const handleWorkspace = async (v, type) => {
    const workspaces = allWorkspaces.workspaces;
    const workspace = currentWorkspace;

    if (type === "space") {
      const filtered = workspace.find(({ value }) => value === v);
      if (filtered) {
        const { success, error } = await setWorkspace(filtered);
        if (success) {
          session.set("token", success.token);
          session.remove("results");
          session.remove("comments");
          updateUser({ workspace: filtered });
          updateData({ updateSummary: true, updateComments: true });
        }
        error && console.log(error.message);
      }
    }

    if (type === "brand") {
      if (workspaces[v]) {
        const { success, error } = await setWorkspace(workspaces[v][0]);
        if (success) {
          session.set("token", success.token);
          session.set("workspace", workspaces[v]);
          session.remove("results");
          session.remove("comments");
          updateWorkspace(workspaces[v]);
          updateUser({ workspace: workspaces[v][0] });
          updateData({ updateSummary: true, updateComments: true });
        }
        error && console.log(error.message);
      }
    }
  };

  const handleLogout = () => {
    toggleHideAll(true);
    logout();
  };

  // Use effect
  // Set the test data state

  // Render html
  // Function that uses state test data

  // View the results

  // Html element 2
  // onClick =>id to testFunction(id)

  // Test Function
  // ID filter from test data

  return (
    <>
      {!hideAll && (
        <>
          <nav className="navbar sticky-top navbar-expand-md" id="topNav">
            <NavLink
              to="/summary"
              className="navbar-brand"
              override="brand-wrapper"
            >
              <img
                style={{ width: "30px", marginRight: "5px" }}
                src={logo}
                alt="Wheel Lock Solutions"
              />
              {process.env.REACT_APP_TITLE}
            </NavLink>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item mr-2 sub-title">Customer Satisfaction</li>
            </ul>
            <div
              className={
                "collapse " +
                (collapse ? "navbar-collapsed" : "navbar-collapse") +
                (expandCollapsed ? " show" : "")
              }
              id="navbarMenu"
            >
              <ul className="navbar-nav ml-auto">
                {currentWorkspace && (
                  <>
                    <li className="nav-item ml-2">
                      <Dropdown
                        title={"Brand " + user.workspace.brand}
                        values={brands}
                        action={(e) => handleWorkspace(e, "brand")}
                      />
                    </li>
                    <li className="nav-item ml-2">
                      <Dropdown
                        title={"Workspace " + user.workspace.name}
                        values={currentWorkspace}
                        action={(e) => handleWorkspace(e, "space")}
                      />
                    </li>
                  </>
                )}
                {user.role !== "guest" && (
                  <li className="nav-item ml-2">
                    <NavLink to="/profile" className="btn-link ml-3">
                      Hi {user.name}!
                    </NavLink>
                  </li>
                )}
                <li className="nav-item ml-auto">
                  <NavLink
                    to="/login"
                    className="btn-link ml-3"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
            {collapse && (
              <Button
                className="navbar-toggler"
                onClick={() => toggleExpandCollapsed(!expandCollapsed)}
              >
                <span>
                  <i
                    className={expandCollapsed ? "fas fa-times" : "fas fa-bars"}
                  ></i>
                </span>
              </Button>
            )}
          </nav>
          <SubNav props={props} />
          {props.children}
          <Footer props={props} user={user} />
        </>
      )}
    </>
  );
};

export default Nav;
