import React, { useState, useEffect } from "react";
import EN from "./form/en";
import ES from "./form/es";
import NotFound from "./form/404";
import config from "./setup";
import {
  generateUserToken,
  rageClicks,
  rageScrolls,
  runSurvey,
  check404,
  isES,
} from "./services/utilities";

function App() {
  const [run, setRun] = useState(false);
  const [force, setForce] = useState(false);

  useEffect(() => {
    !window.wheelock && (window.wheelock = {});
    window.wheelock[config.title] = config;
    generateUserToken();
    if (runSurvey()) {
      setRun(true);
      //# Run rage click listener
      if (window.wheelock[config.title].event.rageClicks) {
        document.addEventListener("click", () => {
          rageClicks() && setForce(true);
        });
      }
      //# Run rage scroll listener
      if (window.wheelock[config.title].event.rageScrolls) {
        document.addEventListener("scroll", () => {
          rageScrolls() && setForce(true);
        });
      }
    }
  }, [setRun]);

  const renderForm = () => {
    if (check404()) return <NotFound force={force} />;
    if (isES()) return <ES force={force} />;
    else return <EN force={force} />;
  };

  return <>{run && renderForm()}</>;
}

export default App;
