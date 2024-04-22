import React, { useState, useEffect, useCallback } from "react";
import RatingButtons from "../components/ratingButtons";
import Button from "../components/common/button";
import Select from "../components/selectOther";
import { autoHide, getSessions, launchPopup } from "../services/utilities";
import post2Survey from "../services/http";
// Assets
import config from "../setup";
import AccomplishRadios from "../components/accomplishRadios";

const ES = (props) => {
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
      !entries.rating && (errors.rating = "Requerido");
      !entries.nps && (errors.nps = "Requerido");
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
    const { data } = await post2Survey(entries, config.altEndpoint);
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
        className={"wheelock-feedback es" + (showFeedback ? "" : " fade-in")}
        action={() => manualStartSurvey()}
      >
        <p>Comentarios</p>
      </Button>
      <div className={"wheelock-bg" + (showForm ? "" : " hide-this")}>
        <form
          id="wheelock"
          className="wheelock-survey popup es"
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
              <p>¡Nos encantaría que nos contaras tu experiencia!</p>
              <p>
                ¿Tienes algunos <b> minutos </b> para contestar algunas
                preguntas sobre tu visita hoy?
              </p>
              <div className="flex">
                <Button
                  className="btn btn-main start analyticsFeedbackLink"
                  action={() => startSurveyFn()}
                >
                  Comenzar
                </Button>
                <Button
                  className="btn btn-main grey survey-close"
                  action={() => exitSurvey(true)}
                >
                  No, gracias
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
                <h3>¡Gracias por tus comentarios!</h3>
              </div>
            </div>
            <h6 className={"review" + (showReview ? "" : " hide-this")}>
              ¿Consideraría calificarnos en{" "}
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
            <h5>Ayúdanos a mejorar la experiencia de tu sitio web</h5>
            <div className="form-group">
              <div className="rating-error">{required && required.rating}</div>
              <label htmlFor="wheelock-rating">
                ¿Qué tan satisfecho estuvo con su experiencia en reliant.com?{" "}
                <span>*</span>
              </label>
              <div className="rating-wrapper">
                <RatingButtons className="rate-radio" name="rating" />
              </div>
              <div className="float-wrapper">
                <p className="float-left">Muy insatisfecho</p>
                <p className="float-right">Muy satisfecho</p>
              </div>
            </div>
            <hr />
            <div className="form-group">
              <div className="rating-error">{required && required.nps}</div>
              <label htmlFor="wheelock-nps">
                ¿Qué tan probable es que le recomiendes a Reliant a un amigo o
                colega? <span>*</span>
              </label>
              <div className="rating-wrapper">
                <RatingButtons className="nps-radio" name="nps" />
              </div>
              <div className="float-wrapper">
                <p className="float-left">Muy poco probable</p>
                <p className="float-right">Muy probable</p>
              </div>
            </div>
            <hr />
            <div className="form-group">
              <label htmlFor="wheelock-reason">
                ¿Cuál fue la razón principal por la que visitaste el sitio web
                hoy?
              </label>
              <Select
                name="reason"
                defaultOption="Selecciona..."
                showOther={(e) => toggleShowOther(e)}
                values={[
                  { value: "Pay my bill", name: "Pagar mi factura" },
                  { value: "View my bill", name: "Ver mi factura" },
                  {
                    value: "Sign up for an electricity plan",
                    name: "Inscribirme en un plan de electricidad",
                  },
                  {
                    value: "View my electricity usage",
                    name: "Ver mi consumo de electricidad",
                  },
                  { value: "Move my service", name: "Mover mi servicio" },
                  {
                    value: "Renew or change my plan",
                    name: "Renovar o cambiar mi plan",
                  },
                  { value: "Report an outage", name: "Reportar un apagón" },
                  { value: "Other", name: "Otra" },
                ]}
              />
              <div
                className={"form-group mt-2" + (showOther ? "" : " hide-this")}
              >
                <textarea
                  name="other"
                  id="wheelock-other"
                  rows="3"
                  placeholder="Describe el motivo de tu visita."
                ></textarea>
              </div>
            </div>
            <hr />
            <div className="form-group form-radios">
              <label htmlFor="accomplish">
                ¿Lograste tu meta durante tu visita?
              </label>
              <div className="radio-wrapper">
                <AccomplishRadios radioLabels={["Sí", "No"]} />
              </div>
            </div>
            <hr />
            <div className="form-group">
              <label htmlFor="wheelock-comments" className="comment-label">
                ¿Qué te gustaría decirnos sobre tu experiencia?
              </label>
              <textarea
                name="comments"
                id="wheelock-comments"
                rows="3"
                placeholder="Cuéntanos más acerca de tu experiencia..."
              ></textarea>
            </div>
            <button
              id="wheelock-formSubmit"
              className="btn btn-main"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ES;
