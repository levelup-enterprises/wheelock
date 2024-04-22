import React, { useState } from "react";
import Button from "../common/button";
import Notes from "../../forms/notes";

const App = ({ data }) => {
  const [collapse, toggleCollapse] = useState(data.expandComment);
  const [collapseES, toggleES] = useState(false);
  const [constrain, toggleConstrain] = useState(true);

  const dynatraceLink =
    process.env.REACT_APP_DYNATRAC_LINK + data.performance_id;

  const task = data.accomplish
    ? data.accomplish === "yes"
      ? "success"
      : "failed"
    : "N/A";

  const taskColor = data.accomplish
    ? data.accomplish === "yes"
      ? "positive"
      : "negative"
    : "";

  const setColor = (data) => {
    let rate = "positive";
    data < 7 ? (rate = "negative") : data < 8 && (rate = "neutral");
    return rate;
  };

  return (
    <div className={"card app " + task} key={data.id}>
      <div className="header">
        <div className="row">
          <div className={"col" + (constrain ? " ellipsis" : "")}>
            <span
              className="ellipsis-click"
              title={data.reason}
              onClick={() => toggleConstrain(!constrain)}
            >
              {data.reason}
            </span>{" "}
            - <span className={taskColor}>{task}</span>
          </div>

          {typeof data.rating !== undefined && typeof data.nps !== undefined ? (
            <div className="col text-center">
              CSAT <span className={setColor(data.rating)}>{data.rating}</span>{" "}
              NPS <span className={setColor(data.nps)}>{data.nps}</span>
            </div>
          ) : data.rating ? (
            <div className="col text-center">
              CSAT <span className={setColor(data.rating)}>{data.rating}</span>
            </div>
          ) : (
            data.nps && (
              <div className="col text-center">
                NPS <span className={setColor(data.nps)}>{data.nps}</span>
              </div>
            )
          )}
          <div className="col text-right">{data.date}</div>
        </div>
      </div>
      <div className="comment">{data.comments}</div>

      {data.language === "ES" && (
        <>
          <div className={"es-wrapper collapse" + (collapseES ? "show" : "")}>
            {data.reason_es && (
              <div className="comment">
                <p className="sub-title">Reason</p>
                {data.reason_es}
              </div>
            )}
            {data.comments_es && (
              <div className="comment">
                <p className="sub-title">Comment</p>
                {data.comments_es}
              </div>
            )}
            {data.comments_covid_es && (
              <div className="comment">
                <p className="sub-title">Covid response</p>
                {data.comments_covid_es}
              </div>
            )}
          </div>
          <Button
            className="btn btn-info"
            text={!collapseES ? "View original ES" : "Hide original ES"}
            onClick={() => toggleES(!collapseES)}
          />
        </>
      )}
      {collapse && (
        <div className="details collapse show">
          <hr />
          <div className="row">
            {dynatraceLink ? (
              <div className="col">
                Dynatrace ID :{" "}
                {/* <Link to={dynatraceLink} title="Dynatrace session link">
                  {data.performance_id}
                </Link> */}
              </div>
            ) : (
              <div className="col">Dynatrace ID : {data.performance_id}</div>
            )}
            <div className="col">Launched: {data.survey_trigger}</div>
          </div>
          <div className="row">
            <div className="col line-compress">
              Analytics ID :{" "}
              <span title={data.analytics_id}>{data.analytics_id}</span>
            </div>
            <div className="col">CA# : {data.ca_number}</div>
          </div>
          <div className="row">
            <div className="col">Brand : {data.brand}</div>
            <div className="col">OS : {data.mobile_os}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col">Device details : {data.device_details}</div>
          </div>
          <hr />
          <div className="notes">
            <Notes link={data.link} id={data.id} existingNote={data.notes} />
          </div>
        </div>
      )}
      <div className="footer">
        <div className="alert-status">{data.alertStatus}</div>
        <Button
          className="expand-btn"
          onClick={() => toggleCollapse(!collapse)}
        >
          {collapse ? String.fromCharCode(10005) : String.fromCharCode(10530)}
        </Button>
      </div>
    </div>
  );
};

export default App;
