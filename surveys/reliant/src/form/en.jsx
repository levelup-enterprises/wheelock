import React, { useState, useEffect, useCallback } from "react";
import RatingButtons from "../components/ratingButtons";
import Button from "../components/common/button";
import Select from "../components/selectOther";
import { autoHide, getSessions, launchPopup } from "../services/utilities";
import post2Survey from "../services/http";
// Assets
import config from "../setup";
import AccomplishRadios from "../components/accomplishRadios";

const EN = (props) => {
  const [showFeedback, toggleShowFeedback] = useState(false);
  const [showForm, toggleShowForm] = useState(false);
  const [showReview, toggleShowReview] = useState(false);
  const [showMenu, toggleShowMenu] = useState(true);
  const [showThankYou, toggleShowThankYou] = useState(false);
  const [showSurvey, toggleShowSurvey] = useState(false);
  const [showOther, toggleShowOther] = useState(false);

  const [required, setRequired] = useState(null);
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
    setRequired(null);

    const form = new FormData(e.target);
    let entries = {};

    for (let entry of form.entries()) {
      entries[entry[0]] = entry[1];
    }

    //! Required
    if (!entries.rating || !entries.nps) {
      let errors = {};
      !entries.rating && (errors.rating = "Required");
      !entries.nps && (errors.nps = "Required");
      setRequired(errors);
      return;
    }

    //* Show google review
    entries.nps > 8 && toggleShowReview(true);

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
          className="wheelock-survey popup"
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
              <p>We'd love your feedback!</p>
              <p>
                Do you have a <b>minute</b> to answer a few questions about your
                visit today?
              </p>
              <div className="flex">
                <Button
                  className="btn btn-main start analyticsFeedbackLink"
                  action={() => startSurveyFn()}
                >
                  Start
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
              <div className="form-hugo-thanks">
                <img src={config.hugoImg} alt="Hugo" />
              </div>
              <div className="container text-wrapper">
                <h3>Thank you for your feedback!</h3>
              </div>
            </div>
            <h6 className={"review" + (showReview ? "" : " hide-this")}>
              Would you consider rating us on{" "}
              <a href="http://bit.ly/31Wa4z4" target="_blank" rel="noreferrer">
                Google
              </a>
              ?
            </h6>
          </div>
          {/* Primary section */}
          <div
            className={
              "container-form take-survey" + (showSurvey ? "" : " hide-this")
            }
          >
            <h5>Help us improve your website experience</h5>
            <div className="form-group">
              <div className="rating-error">{required && required.rating}</div>
              <label htmlFor="wheelock-rating">
                How satisfied were you with your experience on reliant.com?{" "}
                <span>*</span>
              </label>
              <div className="rating-wrapper">
                <RatingButtons className="rate-radio" name="rating" />
              </div>
              <div className="float-wrapper">
                <p className="float-left">Very dissatisfied</p>
                <p className="float-right">Very satisfied</p>
              </div>
            </div>
            <hr />
            <div className="form-group">
              <div className="rating-error">{required && required.nps}</div>
              <label htmlFor="wheelock-nps">
                How likely are you to recommend Reliant to a friend or
                colleague? <span>*</span>
              </label>
              <div className="rating-wrapper">
                <RatingButtons className="nps-radio" name="nps" />
              </div>
              <div className="float-wrapper">
                <p className="float-left">Very unlikely</p>
                <p className="float-right">Very likely</p>
              </div>
            </div>
            <hr />
            <div className="form-group">
              <label htmlFor="wheelock-reason">
                What was your primary reason for visiting the site today?
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
            <div className="form-group form-radios">
              <label htmlFor="accomplish">
                Did you accomplish the goal of your visit?
              </label>
              <div className="radio-wrapper">
                <AccomplishRadios />
              </div>
            </div>
            <hr />
            <div className="form-group">
              <label htmlFor="wheelock-comments" className="comment-label">
                What would you like to share about your experience?
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
              // action={(e) => submitSurvey(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default EN;
