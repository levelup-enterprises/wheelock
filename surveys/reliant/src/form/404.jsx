import React, { useState, useEffect, useCallback } from "react";
import Button from "../components/common/button";
import Select from "../components/selectOther";
import { autoHide, getSessions, launchPopup } from "../services/utilities";
import post2Survey from "../services/http";
// Assets
import config from "../setup";

const NotFound = (props) => {
  const [showFeedback, toggleShowFeedback] = useState(false);
  const [showForm, toggleShowForm] = useState(false);
  const [showMenu, toggleShowMenu] = useState(true);
  const [showThankYou, toggleShowThankYou] = useState(false);
  const [showSurvey, toggleShowSurvey] = useState(false);
  const [showOther, toggleShowOther] = useState(false);

  const [formData, setFormData] = useState(null);

  /** ----------------------------------
   ** Attempt to launch popup
   * -----------------------------------
   */
  const startLaunch = useCallback(async (override = null) => {
    (await launchPopup(override)) && initializeSurvey();
  }, []);

  useEffect(() => {
    props.force ? startLaunch(true) : startLaunch();
    toggleShowFeedback(true);
  }, [startLaunch, props]);

  const initializeSurvey = async () => {
    toggleShowForm(true);
    let formData = await getSessions();
    setFormData(formData);
    console.log(formData);
  };

  /** ----------------------------------
   ** External launch
   * -----------------------------------
   * Adds ability to manually launch
   *  survey from console.
   */
  window.wheelock.primary.manualLaunch = () => {
    launchPopup(true) && initializeSurvey();
  };

  /** ----------------------------------
   ** Manual start
   * -----------------------------------
   */
  const manualStartSurvey = () => {
    launchPopup(true) && initializeSurvey();
  };

  /** ----------------------------------
   ** Start survey
   * -----------------------------------
   */
  const startSurveyFn = () => {
    toggleShowMenu(false);
    toggleShowSurvey(true);
  };

  /** ----------------------------------
   ** Submit survey
   * -----------------------------------
   */
  const submitSurvey = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    let entries = {};

    for (let entry of form.entries()) {
      entries[entry[0]] = entry[1];
    }

    entries.reportError = true;

    toggleShowThankYou(true);
    toggleShowSurvey(false);
    toggleShowFeedback(false);

    entries = { ...entries, ...formData };
    console.log(entries);
    const { data } = await post2Survey(entries);
    console.log(data);
    (await autoHide()) && exitSurvey();
  };

  /** ----------------------------------
   ** Exit survey
   * -----------------------------------
   */
  const exitSurvey = () => {
    toggleShowForm(false);
  };

  return (
    <>
      <Button
        className={"wheelock-feedback" + (showFeedback ? "" : " fade-in")}
        action={() => manualStartSurvey()}
      >
        <p>Feedback</p>
      </Button>
      <div className={"wheelock-bg" + (showForm ? "" : " hide-this")}>
        <form
          id="wheelock"
          className="wheelock-survey popup form-404"
          onSubmit={(e) => submitSurvey(e)}
        >
          <Button className="form-close" action={() => toggleShowForm(false)}>
            <img className="close" src={config.closeImg} alt="close" />
          </Button>
          {!showSurvey && (
            <div className="form-logo">
              <img src={config.logoImg} alt="logo" />
            </div>
          )}
          {/* Menu section */}
          <div
            className={
              "container-form start-survey m-10" +
              (showMenu ? "" : " hide-this")
            }
          >
            <div className="container">
              <p>
                We're sorry, looks like you couldn't find what you were looking
                for!
              </p>
              <p>Do you want to report a broken link?</p>
              <div className="flex">
                <Button
                  className="btn btn-main start analyticsFeedbackLink"
                  action={() => startSurveyFn()}
                >
                  Yes
                </Button>
                <Button
                  className="btn btn-main grey survey-close"
                  action={() => exitSurvey(true)}
                >
                  No thanks
                </Button>
              </div>
            </div>
            <div className="container form-hugo">
              <img src={config.hugoImg} alt="Hugo" />
            </div>
          </div>
          {/* Thank you section */}
          <div className={"thankyou" + (showThankYou ? "" : " hide-this")}>
            <div className="container-form inline-flex">
              <div className="form-hugo">
                <img src={config.hugoImg} alt="Hugo" />
              </div>
              <div className="container text-wrapper">
                <h3>Thank you for your feedback!</h3>
              </div>
            </div>
          </div>
          {/* Primary section */}
          <div
            className={
              "container-form take-survey" + (showSurvey ? "" : " hide-this")
            }
          >
            <h2>Let's get this fixed!</h2>
            <div className="form-group">
              <label htmlFor="wheelock-reason">
                What were you trying to do before you got here?
              </label>
              <Select
                name="reason"
                showOther={(e) => toggleShowOther(e)}
                values={[
                  "Pay my bill",
                  "View my bill",
                  "Sign up for an electricity plan",
                  "View my electricity usage",
                  "Move my service",
                  "Renew or change my plan",
                  "Report an outage",
                  "Other",
                ]}
              />
              <div
                className={"form-group mt-2" + (showOther ? "" : " hide-this")}
              >
                <textarea
                  name="other"
                  id="wheelock-other"
                  rows="3"
                  placeholder="Please describe the reason for your visit."
                ></textarea>
              </div>
            </div>
            <hr />
            <div className="form-group">
              <label htmlFor="wheelock-comments" className="comment-label">
                Is there anything else you would like to share?
              </label>
              <textarea
                name="comments"
                id="wheelock-comments"
                rows="3"
                placeholder="Tell us more about your experience…"
              ></textarea>
            </div>
            <button
              id="wheelock-formSubmit"
              className="btn btn-main"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default NotFound;
