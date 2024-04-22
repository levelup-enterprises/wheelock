import React, { useState } from "react";
import Preview from "./charts/preview";

const BottomNav = () => {
  const [collapsed, toggleCollapsed] = useState(true);

  return (
    <div id="bottomNav" className={collapsed ? "collapsed-menu" : ""}>
      {collapsed ? (
        <button
          className="collapse-btn"
          title="Open Menu"
          onClick={() => toggleCollapsed(!collapsed)}
        >
          + Widgets
        </button>
      ) : (
        <button
          className="collapse-btn close-btn"
          title="Open Menu"
          onClick={() => toggleCollapsed(!collapsed)}
        >
          X
        </button>
      )}
      <div className="container-fluid">
        <div className="center-wrapper">
          <h1 className="center-txt title">Widgets</h1>
          {/* <button className="btn-custom edit-dash" title="Edit Dashboard">
            Edit Dashboard
          </button> */}
        </div>
        <div className={"widget-wrapper" + (collapsed ? " hide" : "")}>
          <Preview />
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
