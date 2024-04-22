import React, { useState } from "react";
import session from "../../services/session";
import { ResponsiveBar } from "@nivo/bar";
import Button from "../common/button";

const TaskSummary = ({ tasks, active = false }) => {
  const keys = ["Positive", "Negative"];
  const [showInfo, toggleInfo] = useState(false);

  const doAction = (e) => {
    console.log(e);
    if (e.data.reason !== "Other") {
      session.remove("comments");
      session.remove("searchContainer");
      session.set("searchQuery", {
        query: { search: e.data.reason },
      });
      window.location.href = "/comments";
    }
  };

  // Combine totals to get totalSum for %
  const totals = tasks.map((v) => parseInt(v.total));
  const totalSum = totals.reduce((a, b) => a + b, 0);

  let data = tasks.map((v) => {
    const accomplished =
      v.accomplished !== null ? parseFloat(v.accomplished) * 10 : 0;
    const total = Math.ceil((v.total / totalSum) * 100);
    const title = `${v.reason} ${total}%`;

    return {
      index: title,
      Positive: accomplished,
      Negative: 100 - accomplished,
      reason: v.reason,
      total: v.total,
    };
  });

  data = data.reverse();

  let clean = [];
  data.forEach((v) => {
    v.total > 0 && clean.push(v);
  });
  data = clean;

  return (
    <div
      className={
        "card taskSummary" + (active && active.disabled ? " active" : "")
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
        Tasks Summary<span className="comparison"></span>
      </h5>
      {showInfo ? (
        <div className="info">
          <p>
            Displays NPS score along with detractors, passives and promoters.
          </p>
          <Button
            text={
              active.disabled ? "Remove from dashboard" : "Add to dashboard"
            }
            className="btn btn-primary"
            onClick={() => active.updateWidget("taskSummary")}
          />
        </div>
      ) : (
        <>
          <div
            className="top-container"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <span>Responses</span>
            <span>Average accomplished</span>
          </div>
          <div className="structure-wrapper">
            <div className="chart-wrapper">
              <ResponsiveBar
                data={data}
                keys={keys}
                indexBy="index"
                margin={{ top: 0, right: 10, bottom: 10, left: 175 }}
                padding={0.4}
                innerPadding={1.4}
                layout="horizontal"
                indexScale={{ type: "band", round: true }}
                colors={["#64d29c", "#fa6368"]}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={{
                  tickSize: 0,
                  tickPadding: 5,
                  tickRotation: 0,
                  legendPosition: "middle",
                  legendOffset: 0,
                }}
                label={(d) =>
                  d.id === "Positive"
                    ? d.value >= 50
                      ? d.value + "%"
                      : null
                    : d.value > 50
                    ? d.value + "%"
                    : null
                }
                tooltip={({ id, value, color, indexValue, data }) => (
                  <>
                    <strong style={{ color }}>
                      {id}: {value}%
                    </strong>
                    <p>Total submitted: {data.total}</p>
                  </>
                )}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="#fff"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                onClick={(e) => doAction(e)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default TaskSummary;
