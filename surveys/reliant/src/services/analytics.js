import { clg } from "./utilities";
import config from "../setup";

/** ---------------------------------------
 ** Set custom variables for Adobe launch function
 */
export const launchAnalytics = () => {
  if (window.csatSurveyPoppedUp) {
    const triggered = window.wheelock.primary.triggeredState;
    var status = {
      title: "Standard Site Survey:v5",
      manual: false,
      forced: false,
      reason: "Standard Auto Pop Rules",
      location: "Center Center",
    };

    if (triggered === "manual") {
      status.manual = true;
      status.reason = "User initiated";
      status.location = "Middle Left";
    }

    if (triggered === "forced") {
      status.forced = true;
      status.reason = "Rage Detected";
    }
    // config.secondary.use && (status.title = secondary.title);

    try {
      window.csatSurveyPoppedUp(
        status.title,
        status.manual,
        status.forced,
        status.reason,
        status.location
      );
    } catch (e) {
      clg(config.desc + " analytics error: " + e, "red");
    }
  }
};
