import React, { useState } from "react";
import session from "../../services/session";
import { ResponsiveBar } from "@nivo/bar";
import Button from "../common/button";
import _ from "lodash";

const NPS = ({ nps, active = false }) => {
  const { score, previous, trend } = nps;
  const [showInfo, toggleInfo] = useState(false);
  const keys = ["Detractors", "Passives", "Promoters"];

  const doAction = (e) => {
    console.log(e);
    let query = {};
    if (e.id === "Detractors") {
      query = {
        nps: ["is less than", 7],
        search: "",
      };
    } else if (e.id === "Passives") {
      query = {
        nps: ["is greater than", 6],
        nps: ["is less than", 9],
        search: "",
      };
    } else if (e.id === "Promoters") {
      query = {
        nps: ["is greater than", 8],
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

  const setPrevious = () =>
    score.total > previous.total ? (
      <span className="positive">
        <i className="fas fa-caret-up"></i> {score.total - previous.total}{" "}
      </span>
    ) : (
      <span className="negative">
        <i className="fas fa-caret-down"></i> {previous.total - score.total}{" "}
      </span>
    );

  const data = [
    {
      index: "total",
      Detractors: score.detractors,
      Passives: score.passives,
      Promoters: score.promoters,
      Counts: score.counts,
      total: score.counts.total,
    },
  ];

  return (
    <div
      className={"card nps" + (active && active.disabled ? " active" : "")}
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
        NPS<span className="comparison"></span>
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
            onClick={() => active.updateWidget("nps")}
          />
        </div>
      ) : (
        <>
          <div className="top-container">
            <h1>{score.total}</h1>
            <p>
              {previous && setPrevious()}
              {previous && trend}
            </p>
          </div>
          <div className="structure-wrapper">
            <div className="chart-wrapper" style={{ minHeight: "150px" }}>
              <ResponsiveBar
                data={data}
                keys={keys}
                indexBy="index"
                margin={{ top: 0, right: 20, bottom: 20, left: 20 }}
                padding={0.4}
                innerPadding={2}
                layout="horizontal"
                indexScale={{ type: "band", round: true }}
                colors={["#fa6368", "#ffb400", "#64d29c"]}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={null}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="#fff"
                tooltip={({ id, value, color, indexValue, data }) => (
                  <>
                    <strong style={{ color }}>
                      {id}: {value}
                    </strong>
                    <p>Total submitted: {data.total}</p>
                  </>
                )}
                theme={{
                  fontSize: 14,
                  labels: {
                    text: {
                      fontSize: 15,
                    },
                  },
                }}
                legends={[
                  {
                    dataFrom: "keys",
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 0,
                    itemsSpacing: 2,
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
          </div>
          {/* <button className="btn btn-expand" alt="Expand" title="Expand"></button> */}
        </>
      )}
    </div>
  );
};
export default NPS;
