import React, { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import Button from "../common/button";

const CSAT = ({ csat, active = false }) => {
  const { score, desktop, mobile, previous, trend } = csat;
  const [showInfo, toggleInfo] = useState(false);

  const doAction = (e) => {
    console.log(e);
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
      id: "Positive",
      label: "Positive",
      value: score,
      total: desktop.counts.total + mobile.counts.total,
    },
    {
      id: "Negative",
      label: "Negative",
      value: 100 - score,
      total: desktop.counts.total + mobile.counts.total,
    },
  ];

  return (
    <div
      className={
        "card csatTotal" + (active && active.disabled ? " active" : "")
      }
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
        CSAT<span className="comparison"></span>
      </h5>
      {showInfo ? (
        <div className="info">
          <p>Displays CSAT score. </p>
          <p>
            Provides separate desktop and mobile rates for further drill-down.
          </p>
          <Button
            text={
              active.disabled ? "Remove from dashboard" : "Add to dashboard"
            }
            className="btn btn-primary"
            onClick={() => active.updateWidget("csat")}
          />
        </div>
      ) : (
        <>
          <div className="top-container">
            <div className="top-wrapper">
              <h1>
                {score}
                <span className="small">%</span>
              </h1>
              {previous && setPrevious(score, previous.score)}
            </div>
          </div>
          <div className="structure-wrapper">
            <div className="chart-wrapper" style={{ minHeight: "150px" }}>
              <ResponsivePie
                data={data}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                startAngle={-120}
                endAngle={120}
                innerRadius={0.76}
                padAngle={0.8}
                colors={["#1d7de1", "#a7a9aa"]}
                enableRadialLabels={false}
                enableSliceLabels={false}
                tooltip={(e) => {
                  const v = e.datum;
                  return (
                    <>
                      <strong style={{ color: v.color }}>
                        {v.id}: {v.value}%
                      </strong>
                      <p>Total submitted: {v.data.total}</p>
                    </>
                  );
                }}
                theme={{
                  tooltip: {
                    background: "#fff",
                    padding: "7px",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
                  },
                }}
                onClick={(e) => doAction(e)}
              />
            </div>
          </div>
          <div className="bottom-container">
            <div className="left-wrapper">
              <h6>
                Desktop <b>{desktop.average}%</b>
              </h6>
              {previous &&
                setPrevious(desktop.average, previous.desktop.average)}
            </div>
            <div className="right-wrapper">
              <h6>
                Mobile <b>{mobile.average}%</b>
              </h6>
              {previous && setPrevious(mobile.average, previous.mobile.average)}
            </div>
          </div>
          {/* <button className="btn btn-expand" alt="Expand" title="Expand"></button> */}
        </>
      )}
    </div>
  );
};
export default CSAT;
