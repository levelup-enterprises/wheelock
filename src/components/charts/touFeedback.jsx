import React, { useState, useContext } from "react";
import session from "../../services/session";
import { ResponsivePie } from "@nivo/pie";
import { UserContext } from "../../context/user";
import Button from "../common/button";
import _ from "lodash";

const TouFeedback = ({ tou, active = false }) => {
  const { desktop, mobile, previous, trend } = tou;
  const [showInfo, toggleInfo] = useState(false);
  const { user } = useContext(UserContext);

  const doAction = (e) => {
    // console.log(e);
    if (user.workspace === "tou") {
      let query = {};
      if (e.id === "Helpful") {
        query = {
          helpful: ["equals", "Yes"],
          search: "",
        };
      } else {
        query = {
          helpful: ["equals", "No"],
          search: "",
        };
      }

      if (!_.isEmpty(query)) {
        session.remove("comments");
        session.set("searchQuery", {
          query: query,
        });
        window.location.href = "/comments";
      }
    }
  };

  const setPrevious = (a, b) =>
    a === b ? (
      <>
        <span>-</span>
        <span className="tiny">{trend}</span>
      </>
    ) : a > b ? (
      <span className="positive">
        <i className="fas fa-caret-up"></i> {a - b}%{" "}
        <span className="tiny">{trend}</span>
      </span>
    ) : (
      <span className="negative">
        <i className="fas fa-caret-down"></i> {b - a}%{" "}
        <span className="tiny">{trend}</span>
      </span>
    );

  const data = [
    {
      id: "Helpful",
      label: "Helpful",
      value: tou.helpful,
    },
    {
      id: "Not Helpful",
      label: "Not Helpful",
      value: tou.total - tou.helpful,
    },
  ];

  return (
    <div
      className={"card touTotal" + (active && active.disabled ? " active" : "")}
      title={
        active
          ? active.disabled
            ? "Click to remove from dashboard"
            : "Click to add to dashboard"
          : ""
      }
      onClick={() => active && toggleInfo(!showInfo)}
    >
      <h5 className="title">
        TOU Feedback<span className="comparison"></span>
      </h5>
      {showInfo ? (
        <div className="info">
          <p>Displays approval score along with a break down by devices.</p>
          <Button
            text={
              active.disabled ? "Remove from dashboard" : "Add to dashboard"
            }
            className="btn btn-primary"
            onClick={() => active.updateWidget("touFeedback")}
          />
        </div>
      ) : (
        <>
          <div className="top-container">
            <div className="top-wrapper">
              <h2>
                {tou.percent}
                <span className="small">%</span>
              </h2>
              {previous ? (
                setPrevious(tou.total, previous.total)
              ) : (
                <>
                  <span>- </span>
                  <span className="tiny">{trend}</span>
                </>
              )}
            </div>
          </div>
          <div className="structure-wrapper">
            <div className="chart-wrapper" style={{ minHeight: "150px" }}>
              <ResponsivePie
                data={data}
                margin={{ top: 20, right: 5, bottom: 0, left: 0 }}
                innerRadius={0.7}
                padAngle={tou.percent === 100 || tou.percent === 0 ? 0 : 4}
                colors={["#64d29c", "#fa6368"]}
                enableRadialLabels={false}
                enableSliceLabels={false}
                radialLabelsTextColor={{ from: "color", modifiers: [] }}
                radialLabelsLinkColor={{
                  from: "color",
                  modifiers: [],
                }}
                defs={[
                  {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#53c38d",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                  },
                ]}
                fill={[
                  {
                    match: {
                      id: "Helpful",
                    },
                    id: "lines",
                  },
                ]}
                onClick={(e) => doAction(e)}
              />
            </div>
          </div>
          <div className="bottom-container">
            {desktop && (
              <div className="left-wrapper">
                <h6>
                  Desktop <b>{desktop.percent}%</b>
                </h6>
                {previous && previous.desktop ? (
                  setPrevious(desktop.percent, previous.desktop.percent)
                ) : (
                  <>
                    <span>- </span>
                    <span className="tiny">{trend}</span>
                  </>
                )}
              </div>
            )}
            {mobile && (
              <div className="right-wrapper">
                <h6>
                  Mobile: <b>{mobile.percent}%</b>
                </h6>
                {previous && previous.mobile ? (
                  setPrevious(mobile.percent, previous.mobile.percent)
                ) : (
                  <>
                    <span>- </span>
                    <span className="tiny">{trend}</span>
                  </>
                )}
              </div>
            )}
          </div>
          {/* <button className="btn btn-expand" alt="Expand" title="Expand"></button> */}
        </>
      )}
    </div>
  );
};
export default TouFeedback;
