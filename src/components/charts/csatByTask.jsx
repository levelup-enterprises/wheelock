import React, { useState } from "react";
import session from "../../services/session";
import { ResponsiveBar } from "@nivo/bar";
import Button from "../common/button";

const CsatByTask = ({ reasons, active = false }) => {
  const keys = ["Positive CSAT", "Negative CSAT"];
  const [showInfo, toggleInfo] = useState(false);

  const doAction = (e) => {
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
  const totals = reasons.map((v) => parseInt(v.total));
  const totalSum = totals.reduce((a, b) => a + b, 0);

  let data = reasons.map((v) => {
    const csat = v.csat !== null ? parseFloat(v.csat) * 10 : 0;
    const total = Math.ceil((v.total / totalSum) * 100);
    const title = `${v.reason} ${total}%`;
    return {
      index: title,
      "Positive CSAT": csat,
      "Negative CSAT": 100 - csat,
      reason: v.reason,
      total: v.total,
    };
  });

  data = data.reverse();

  return (
    <div
      className={
        "card csatByTasks" + (active && active.disabled ? " active" : "")
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
        CSAT by Tasks<span className="comparison"></span>
      </h5>
      {showInfo ? (
        <div className="info">
          <p>Displays CSAT scores by related tasks.</p>
          <p>Responses include percentage of returned tasks chosen.</p>
          <p>Average CSAT score provides the related score to task.</p>
          <Button
            text={
              active.disabled ? "Remove from dashboard" : "Add to dashboard"
            }
            className="btn btn-primary"
            onClick={() => active.updateWidget("csatByTasks")}
          />
        </div>
      ) : (
        <>
          <div
            className="top-container"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <span>Responses</span>
            <span>Average CSAT</span>
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
                  d.id === "Positive CSAT"
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
export default CsatByTask;
