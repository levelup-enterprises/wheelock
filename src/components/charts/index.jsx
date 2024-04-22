import React, { useContext } from "react";
import { UserContext } from "../../context/user";
// Charts
import NPS from "./nps";
import CSAT from "./csat";
import TasksAccomplished from "./tasksAccomplished";
import CsatByTask from "./csatByTask";
import NpsByTask from "./npsByTask";
import TaskSummary from "./taskSummary";
import SFFeedback from "./sfFeedback";
import NpsCsatScores from "./NpsCsatScores";

const Charts = (props) => {
  const { user } = useContext(UserContext);
  const { data } = props;

  const buildWidgets = () => {
    if (user.widgets) {
      const charts = user.widgets.map((v) => {
        if (v === "nps" && data[v]) {
          return <NPS nps={data[v]} key={v} />;
        }
        if (v === "csat" && data[v]) {
          return <CSAT csat={data[v]} key={v} />;
        }
        if (v === "npsCsatScores" && data[v]) {
          return <NpsCsatScores scores={data[v]} key={v} />;
        }
        if (v === "npsByTasks" && data[v]) {
          return <NpsByTask reasons={data[v]} key={v} />;
        }
        if (v === "sfFeedback" && data[v]) {
          return <SFFeedback sf={data[v]} key={v} />;
        }
        if (v === "tasksAccomplished" && data[v]) {
          return <TasksAccomplished tasks={data[v]} key={v} />;
        }
        if (v === "csatByTasks" && data[v]) {
          return <CsatByTask reasons={data[v]} key={v} />;
        }
        if (v === "taskSummary" && data[v]) {
          return <TaskSummary tasks={data[v]} key={v} />;
        }
        return <React.Fragment key={v}></React.Fragment>;
      });
      return charts;
    } else
      return (
        <div className="no-results">
          <div className="container">
            <h1 className="grey">Add a widget to get started</h1>
          </div>
        </div>
      );
  };

  return buildWidgets();
};

export default Charts;
