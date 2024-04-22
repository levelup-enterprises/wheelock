import React, { useState } from "react";
import session from "../../services/session";
import { ResponsiveBar } from "@nivo/bar";
import Button from "../common/button";
import _ from "lodash";

const NpsByTask = ({ reasons, active = false }) => {
  const keys = ["Detractors", "Passive", "Promoters"];
  const [showInfo, toggleInfo] = useState(false);

  const doAction = (e) => {
    console.log(e);
    let query = {};
    if (e.id === "Detractors") {
      query = {
        nps: ["is less than", 7],
        search: e.data.reason,
      };
    } else if (e.id === "Passive") {
      query = {
        nps: ["is greater than", 6],
        nps: ["is less than", 9],
        search: e.data.reason,
      };
    } else if (e.id === "Promoters") {
      query = {
        nps: ["is greater than", 8],
        search: e.data.reason,
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

  let data = Object.entries(reasons).map((v) => {
    const title = v[0];
    return {
      index: title,
      Promoters: v[1].promoters,
      Passive: v[1].passives,
      Detractors: v[1].detractors,
      reason: v[0],
      score: v[1].total,
      total: v[1].counts.total,
    };
  });

  data = data.reverse();

  return (
    <div
      className={
        "card npsByTask" + (active && active.disabled ? " active" : "")
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
        NPS by Tasks<span className="comparison"></span>
      </h5>
      {showInfo ? (
        <div className="info">
          <p>Displays NPS scores by related tasks.</p>
          <p>Scores include number of returned tasks chosen.</p>
          <p>
            Average NPS score provides the related score to task broken down by
            detractor, passive and promoters.
          </p>
          <Button
            text={
              active.disabled ? "Remove from dashboard" : "Add to dashboard"
            }
            className="btn btn-primary"
            onClick={() => active.updateWidget("npsByTasks")}
          />
        </div>
      ) : (
        <>
          <div
            className="top-container"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <span>NPS Scores</span>
            <span>Average NPS</span>
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
                colors={["#fa6368", "#ffb400", "#64d29c"]}
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
                tooltip={({ id, value, color, indexValue, data }) => (
                  <>
                    <strong style={{ color }}>
                      {id}: {value}
                    </strong>
                    <p>
                      NPS Score: <b>{data.score}</b>
                    </p>
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
export default NpsByTask;
