import React, { useState } from "react";
import { format } from "date-fns";
import session from "../../services/session";
import { ResponsiveLine } from "@nivo/line";
import Button from "../common/button";

const NpsCsatScores = ({ scores, active = false }) => {
  const [showInfo, toggleInfo] = useState(false);

  const nps = { id: "NPS" };
  const csat = { id: "CSAT" };
  // X-Axis
  let precision = "day";
  let xFormat = "time:%Y-%m-%d";
  let formatValue = "%d";
  let ticks = "every day";
  let rotate = 0;

  nps.data = Object.values(scores.nps).map((v) => v);
  csat.data = Object.values(scores.csat).map((v) => v);

  const size = nps.data.length > 10 || csat.data.length > 10;
  const data = [nps, csat];

  if (scores.months > 1) {
    ticks = "every 1 month";
    precision = "month";
    xFormat = "time:%Y-%m";
    formatValue = "%b";
    rotate = -30;
  } else size && (ticks = "every 3 days");

  const doAction = (e) => {
    console.log(e);
    session.remove("comments");
    session.remove("results");
    let date = format(new Date(e.data.x), "MM/dd/yyyy");
    session.set("dateRange", date + " - " + date);
    window.location.href = "/comments";
  };

  return (
    <div
      className={
        "card npsCsatScores" + (active && active.disabled ? " active" : "")
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
        NPS & CSAT<span className="comparison"></span>
      </h5>
      {showInfo ? (
        <div className="info">
          <p>Displays NPS & CSAT scores over a selected time period.</p>
          <Button
            text={
              active.disabled ? "Remove from dashboard" : "Add to dashboard"
            }
            className="btn btn-primary"
            onClick={() => active.updateWidget("npsCsatScores")}
          />
        </div>
      ) : (
        <>
          <div className="structure-wrapper">
            <div className="chart-wrapper" style={{ minHeight: "280px" }}>
              <ResponsiveLine
                data={data}
                margin={{ top: 10, right: 10, bottom: 80, left: 50 }}
                colors={["#1e7de1", "#64d29c"]}
                xScale={{
                  type: "time",
                  format: "%Y-%m-%d",
                  useUTC: false,
                  precision: precision,
                }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: false,
                  reverse: false,
                }}
                curve="cardinal"
                yFormat=" >-.2f"
                xFormat={xFormat}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  format: formatValue,
                  tickValues: ticks,
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: rotate,
                  legend: scores.label,
                  legendOffset: 60,
                  legendPosition: "end",
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "scores",
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
                pointSize={size ? 5 : 17}
                pointColor={{ from: "color" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabel="y"
                enablePointLabel={!size}
                pointLabelYOffset={4}
                enableCrosshair={false}
                useMesh={true}
                theme={{ dots: { text: { fill: "#ffffff" } } }}
                enableSlices="x"
                sliceTooltip={({ slice }) => {
                  return (
                    <div
                      style={{
                        background: "#fff",
                        padding: 5,
                        borderRadius: 2,
                        boxShadow: "0 2px 5px -2px grey",
                        // borderTop: "2px solid #284054",
                      }}
                    >
                      <p>
                        <strong>{slice.points[0].data.xFormatted}</strong>
                      </p>
                      {slice.points.map((point) => (
                        <>
                          <p>
                            <b style={{ color: point.serieColor }}>
                              {point.serieId}
                            </b>
                            : {point.data.yFormatted}
                          </p>
                        </>
                      ))}
                    </div>
                  );
                }}
                legends={[
                  {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: -70,
                    translateY: 70,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
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
export default NpsCsatScores;
