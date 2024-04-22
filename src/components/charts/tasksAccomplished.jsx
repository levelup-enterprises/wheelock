import React, { useState } from "react";
import session from "../../services/session";
import { ResponsiveBar } from "@nivo/bar";
import Button from "../common/button";
import _ from "lodash";

const TasksAccomplished = ({ tasks, active = false }) => {
  const { desktop, mobile, previous, trend } = tasks;
  const [showInfo, toggleInfo] = useState(false);
  const keys = ["Did not accomplish", "Accomplished"];

  const doAction = (e) => {
    let query = {};
    if (e.id === "Accomplished") {
      query = {
        accomplish: ["equals", "No"],
        device: ["equals", e.indexValue],
        search: "",
      };
    } else {
      query = {
        accomplish: ["equals", "No"],
        device: ["equals", e.indexValue],
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
  };

  const setPrevious = (a, b) =>
    a === b ? (
      <p className="trend">
        <span>-</span>
      </p>
    ) : a > b ? (
      <p className="trend">
        <span className="positive">
          <i className="fas fa-caret-up"></i> {a - b}%
        </span>
      </p>
    ) : (
      <p className="trend">
        <span className="negative">
          <i className="fas fa-caret-down"></i> {b - a}%
        </span>
      </p>
    );

  const data =
    mobile && desktop
      ? [
          {
            index: "Mobile",
            "Did not accomplish": 100 - mobile.average,
            Accomplished: mobile.average,
            total: mobile.total,
          },
          {
            index: "Desktop",
            "Did not accomplish": 100 - desktop.average,
            Accomplished: desktop.average,
            total: desktop.total,
          },
        ]
      : mobile
      ? [
          {
            index: "Mobile",
            "Did not accomplish": 100 - mobile.average,
            Accomplished: mobile.average,
            total: mobile.total,
          },
        ]
      : [
          {
            index: "Desktop",
            "Did not accomplish": 100 - desktop.average,
            Accomplished: desktop.average,
            total: desktop.total,
          },
        ];

  return (
    <div
      className={
        "card taskAccomplished" + (active && active.disabled ? " active" : "")
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
        Task Accomplished<span className="comparison"></span>
      </h5>
      {showInfo ? (
        <div className="info">
          <p>Displays tasks accomplished score broken down by device.</p>
          <Button
            text={
              active.disabled ? "Remove from dashboard" : "Add to dashboard"
            }
            className="btn btn-primary"
            onClick={() => active.updateWidget("tasksAccomplished")}
          />
        </div>
      ) : (
        <div className="structure-wrapper">
          <div className="chart-wrapper">
            <ResponsiveBar
              data={data}
              keys={keys}
              indexBy="index"
              margin={{ top: 20, right: 0, bottom: 20, left: 60 }}
              padding={0.4}
              innerPadding={2}
              layout="horizontal"
              indexScale={{ type: "band", round: true }}
              colors={["#fa6368", "#64d29c"]}
              theme={{
                fontSize: 13,
                labels: {
                  text: {
                    fontSize: 15,
                  },
                },
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={null}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor="#fff"
              tooltip={({ id, value, color, indexValue, data }) => {
                return (
                  <>
                    <strong style={{ color }}>
                      {id}: {value}%
                    </strong>
                    <p>Total submitted: {data.total}</p>
                  </>
                );
              }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: -10,
                  translateY: 0,
                  itemsSpacing: 50,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              onClick={(e) => doAction(e)}
            />
          </div>
          <div
            className="right-container"
            style={!previous ? { minWidth: 0, width: 0 } : {}}
          >
            {previous && (
              <>
                <p className="label">{trend}</p>
                {previous && desktop.average
                  ? setPrevious(desktop.average, previous.desktop.average)
                  : ""}
                {previous && mobile.average
                  ? setPrevious(mobile.average, previous.mobile.average)
                  : ""}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default TasksAccomplished;
