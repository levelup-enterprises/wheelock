import React, { useState } from "react";
import { Link } from "@reach/router";
import Button from "../common/button";
import Notes from "../../forms/notes";

const SF = ({ data }) => {
  const [collapse, toggleCollapse] = useState(data.expandComment);
  const [collapseES, toggleES] = useState(false);

  const dynatraceLink =
    process.env.REACT_APP_DYNATRACE_LINK + data.performance_id;

  const sessionLink = data.session_id
    ? data.session_id.replace(/&amp;/g, "&")
    : null;

  const task = data.helpful ? "success" : "failed";
  const helpfulText = data.helpful === "true" ? "Yes" : "No";

  return (
    <div className="card" key={data.id}>
      <div className="header">
        <div className="row">
          <div className="col">
            Helpful? - <span className={task}>{helpfulText}</span>
          </div>
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
              <div className="col ellipsis">
                Dynatrace ID :{" "}
                <a
                  href={dynatraceLink}
                  title="Dynatrace session link"
                  target="_blank"
                  rel="noreferrer"
                >
                  View session
                </a>
              </div>
            ) : (
              <div className="col">Dynatrace ID : {data.performance_id}</div>
            )}
            <div className="col">
              IP:{" "}
              {data.ip_address &&
                data.ip_address.length < 20 &&
                data.ip_address}
            </div>
          </div>
          <div className="row">
            <div className="col line-compress">
              Analytics ID :{" "}
              <span title={data.analytics_id}>{data.analytics_id}</span>
            </div>
            <div className="col">CA# : {data.ca_number}</div>
          </div>
          <div className="row">
            {sessionLink ? (
              <div className="col ellipsis">
                ContentSquare :{" "}
                <a
                  href={sessionLink}
                  title="Session cam ID"
                  target="_blank"
                  rel="noreferrer"
                >
                  View session
                </a>
              </div>
            ) : (
              <div className="col">ContentSquare : N/A</div>
            )}
            <div className="col">Device : {data.device}</div>
          </div>
          <div className="row">
            <div className="col">Plan : {data.plan}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col ellipsis">
              Page :{" "}
              {data.url && (
                <Link to={data.url} title={data.url}>
                  {data.url}
                </Link>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col ellipsis">
              Previous URL :{" "}
              {data.previous_url && (
                <Link to={data.previous_url} title={data.previous_url}>
                  {data.previous_url}
                </Link>
              )}
            </div>
          </div>
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
        <div className="mt-2 muted">ID: {data.id}</div>
      </div>
    </div>
  );
};

export default SF;
