import React, { useState, useContext } from "react";
import { UserContext } from "../../context/user";
import { updateWidgets } from "../../services/post";
import session from "../../services/session";
// Charts
import NPS from "./nps";
import CSAT from "./csat";
import TasksAccomplished from "./tasksAccomplished";
import CsatByTask from "./csatByTask";
import NpsByTask from "./npsByTask";
import TaskSummary from "./taskSummary";
import TouFeedback from "./touFeedback";
import SFFeedback from "./sfFeedback";
import NpsCsatScores from "./NpsCsatScores";

const Preview = () => {
  const { user, updateUser } = useContext(UserContext);
  const [data, updateData] = useState({
    nps: {
      desktop: { promoters: 54, detractors: 28, passives: 19, total: 26 },
      mobile: { promoters: 70, detractors: 18, passives: 13, total: 52 },
      previous: {
        desktop: { promoters: 59, detractors: 23, passives: 18, total: 36 },
        mobile: { promoters: 66, detractors: 19, passives: 15, total: 47 },
        detractors: 20,
        passives: 14,
        promoters: 65,
        total: 45,
      },
      score: {
        promoters: 66,
        detractors: 20,
        passives: 14,
        total: 46,
        counts: { neg: 1, pass: 0, pos: 0, total: 1 },
      },
      trend: "MoM",
    },
    csat: {
      desktop: { average: 0, counts: { total: 0 } },
      mobile: { average: 89, counts: { total: 10 } },
      previous: {
        desktop: { average: 0 },
        mobile: { average: 78 },
        score: 50,
      },
      score: 68,
      trend: "MoM",
    },
    npsCsatScores: {
      csat: {
        1: { x: "2021-1-1", y: 73 },
        2: { x: "2021-1-2", y: 61 },
        3: { x: "2021-1-3", y: 74 },
        4: { x: "2021-1-4", y: 70 },
        5: { x: "2021-1-5", y: 57 },
        6: { x: "2021-1-6", y: 73 },
        7: { x: "2021-1-7", y: 73 },
        8: { x: "2021-1-8", y: 70 },
        9: { x: "2021-1-9", y: 74 },
        10: { x: "2021-1-10", y: 68 },
        11: { x: "2021-1-11", y: 56 },
        12: { x: "2021-1-12", y: 56 },
        13: { x: "2021-1-13", y: 69 },
        14: { x: "2021-1-14", y: 73 },
        15: { x: "2021-1-15", y: 70 },
        16: { x: "2021-1-16", y: 70 },
        17: { x: "2021-1-17", y: 72 },
        18: { x: "2021-1-18", y: 71 },
        19: { x: "2021-1-19", y: 59 },
        20: { x: "2021-1-20", y: 69 },
        21: { x: "2021-1-21", y: 78 },
        22: { x: "2021-1-22", y: 75 },
      },
      nps: {
        1: { x: "2021-1-1", y: 48 },
        2: { x: "2021-1-2", y: 43 },
        3: { x: "2021-1-3", y: 63 },
        4: { x: "2021-1-4", y: 58 },
        5: { x: "2021-1-5", y: 27 },
        6: { x: "2021-1-6", y: 44 },
        7: { x: "2021-1-7", y: 50 },
        8: { x: "2021-1-8", y: 41 },
        9: { x: "2021-1-9", y: 54 },
        10: { x: "2021-1-10", y: 54 },
        11: { x: "2021-1-11", y: 45 },
        12: { x: "2021-1-12", y: 4 },
        13: { x: "2021-1-13", y: 45 },
        14: { x: "2021-1-14", y: 62 },
        15: { x: "2021-1-15", y: 48 },
        16: { x: "2021-1-16", y: 51 },
        17: { x: "2021-1-17", y: 58 },
        18: { x: "2021-1-18", y: 42 },
        19: { x: "2021-1-19", y: 25 },
        20: { x: "2021-1-20", y: 49 },
        21: { x: "2021-1-21", y: 58 },
        22: { x: "2021-1-22", y: 45 },
      },
      label: "January",
      months: 1,
    },
    npsByTask: {
      "Move my service": {
        promoters: 25,
        detractors: 25,
        passives: 50,
        total: 0,
        counts: { neg: 1, pass: 0, pos: 0, total: 1 },
      },
      Other: {
        promoters: 46,
        detractors: 38,
        passives: 17,
        total: 8,
        counts: { neg: 1, pass: 0, pos: 0, total: 1 },
      },
      "Pay my bill": {
        promoters: 62,
        detractors: 18,
        passives: 20,
        total: 44,
        counts: { neg: 1, pass: 0, pos: 0, total: 1 },
      },
      "Renew or change my plan": {
        promoters: 51,
        detractors: 28,
        passives: 21,
        total: 23,

        counts: { neg: 1, pass: 0, pos: 0, total: 1 },
      },
      "Report an outage": {
        promoters: 100,
        detractors: 0,
        passives: 0,
        total: 100,
        counts: { neg: 1, pass: 0, pos: 0, total: 1 },
      },
      "Sign up for an electricity plan": {
        promoters: 51,
        detractors: 29,
        passives: 20,
        total: 22,
        counts: { neg: 1, pass: 0, pos: 0, total: 1 },
      },
      "View my bill": {
        promoters: 48,
        detractors: 35,
        passives: 17,
        total: 13,
        counts: { neg: 1, pass: 0, pos: 0, total: 1 },
      },
      "View my electricity usage": {
        promoters: 40,
        detractors: 40,
        passives: 20,
        total: 0,
        counts: { neg: 1, pass: 0, pos: 0, total: 1 },
      },
    },
    touFeedback: {
      desktop: { helpful: "29", total: 51, device: "desktop", percent: 57 },
      helpful: 44,
      mobile: { helpful: "14", total: 29, device: "mobile", percent: 54 },
      percent: 54,
      previous: {
        desktop: { helpful: "1", total: 12, device: "desktop", percent: 8 },
        mobile: { helpful: "0", total: 1, device: "mobile", percent: 8 },
        helpful: 1,
        percent: 8,
        total: 13,
      },
      tablet: { helpful: "1", total: 1, device: "tablet", percent: 54 },
      total: 81,
      trend: "MoM",
    },
    sfFeedback: {
      desktop: { helpful: "29", total: 51, device: "desktop", percent: 57 },
      helpful: 44,
      mobile: { helpful: "14", total: 29, device: "mobile", percent: 54 },
      percent: 54,
      previous: {
        desktop: { helpful: "1", total: 12, device: "desktop", percent: 8 },
        mobile: { helpful: "0", total: 1, device: "mobile", percent: 8 },
        helpful: 1,
        percent: 8,
        total: 13,
      },
      tablet: { helpful: "1", total: 1, device: "tablet", percent: 54 },
      total: 81,
      trend: "MoM",
      title: "OAM Feedback",
    },
    tasksAccomplished: {
      desktop: { average: 80, total: 3 },
      mobile: { average: 96, total: 4 },
      previous: {
        task: 89,
        desktop: { average: 81, total: 12 },
        mobile: { average: 89, total: 23 },
      },
      task: 92,
      trend: "MoM",
    },
    csatByTask: [
      { reason: "Move my service", csat: null, total: "4" },
      { reason: "Pay my bill", csat: "9.1", total: "873" },
      { reason: "Renew or change my plan", csat: null, total: "43" },
      { reason: "Report an outage", csat: null, total: "1" },
      { reason: "Sign up for an electricity plan", csat: null, total: "45" },
      { reason: "View my bill", csat: "8.7", total: "110" },
      { reason: "View my electricity usage", csat: "6.7", total: "56" },
      { reason: "Other", csat: 0, total: 1180 },
    ],
    tasksSummary: [
      { reason: "Pay my bill", accomplished: 10, total: 873 },
      { reason: "View my bill", accomplished: 9, total: 110 },
      {
        reason: "Sign up for an electricity plan",
        accomplished: 8,
        total: 45,
      },
      { reason: "View my electricity usage", accomplished: 8, total: 56 },
      { reason: "Move my service", accomplished: 10, total: 4 },
      { reason: "Renew or change my plan", accomplished: 5, total: 43 },
      { reason: "Report an outage", accomplished: 0, total: 1 },
      { reason: "Other", accomplished: 9.3, total: 1180 },
    ],
  });

  /** ------------------------------------------------
   *# Update live widgets
   * -------------------------------------------------
   * @param {string} widget Name of widget
   */
  const updateWidget = async (widget) => {
    let widgets = user.widgets;
    // Toggle widget list
    widgets.includes(widget)
      ? (widgets = widgets.filter((v) => v !== widget))
      : widgets.push(widget);

    // Update list
    updateUser({ widgets: widgets });
    const { success, error } = await updateWidgets({
      widgets: widgets,
    });
    success && success.token && session.set("token", success.token);
    error && console.log(error.message);
  };

  const isActive = (chart) =>
    user.widgets && user.widgets.includes(chart)
      ? { disabled: true, updateWidget: updateWidget }
      : { disabled: false, updateWidget: updateWidget };

  const buildWidgets = () => {
    return (
      <>
        <NPS nps={data.nps} key="nps" active={isActive("nps")} />
        <CSAT csat={data.csat} key="csat" active={isActive("csat")} />
        <NpsCsatScores
          scores={data.npsCsatScores}
          key="npsCsatScores"
          active={isActive("npsCsatScores")}
        />
        <NpsByTask
          reasons={data.npsByTask}
          key="npsByTasks"
          active={isActive("npsByTasks")}
        />
        <TouFeedback
          tou={data.touFeedback}
          key="touFeedback"
          active={isActive("touFeedback")}
        />
        <SFFeedback
          sf={data.sfFeedback}
          key="sfFeedback"
          active={isActive("sfFeedback")}
        />
        <TasksAccomplished
          tasks={data.tasksAccomplished}
          key="tasksAccomplished"
          active={isActive("tasksAccomplished")}
        />
        <CsatByTask
          reasons={data.csatByTask}
          key="csatByTasks"
          active={isActive("csatByTasks")}
        />
        <TaskSummary
          tasks={data.tasksSummary}
          key="taskSummary"
          active={isActive("taskSummary")}
        />
      </>
    );
  };

  return buildWidgets();
};

export default Preview;
