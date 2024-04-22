import React, { useState, useContext, useEffect, useCallback } from "react";
import Loading from "../components/common/loading";
import { DataContext } from "../context/data";
import session from "../services/session";
import { summary } from "../services/get";
import { toast } from "react-toastify";
import _ from "lodash";
// Charts
import Charts from "../components/charts/index";

const Summary = () => {
  const { data, updateData } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, updateLoadingMessage] = useState("Getting results");
  const [results, updateResults] = useState(null);
  const [alreadyBuilt, toggleBuilt] = useState(false);

  /** -------------------------------------------
   *# Get summary data on date change
   * --------------------------------------------
   */
  const renderWidgets = useCallback(async () => {
    setLoading(true);
    const results = session.get("results");
    if (data.updateSummary) {
      if (!results) {
        const { success, error, empty } = await summary({
          dates: data.dateRange,
        });
        if (success) {
          process.env.NODE_ENV === "development" && console.log(success);
          updateResults(<Charts data={success} />);
          session.set("results", success);
          return smoothLoading(1500);
        }
        if (empty) {
          updateResults({});
          return smoothLoading(0);
        }
        error && toast.error(error.message);
      } else {
        updateResults(<Charts data={results} />);
      }
      updateData({ updateSummary: false });
      toggleBuilt(true);
      return smoothLoading(1000);
    } else if (results && !alreadyBuilt) {
      updateResults(<Charts data={results} />);
      return smoothLoading(700);
    }
    return;
  }, [data, alreadyBuilt, updateData]);

  useEffect(() => {
    renderWidgets();
  }, [renderWidgets]);

  const smoothLoading = (time) => {
    updateLoadingMessage("Rendering charts");
    setTimeout(() => {
      setLoading(false);
    }, time);
  };

  return (
    <>
      {loading ? (
        <Loading message={loadingMessage} />
      ) : (
        <div
          className="container-fluid main-wrapper"
          style={{ marginBottom: "50px" }}
        >
          {!_.isEmpty(results) ? (
            <div id="displayWidgets">{results}</div>
          ) : (
            <div className="no-results">
              <div className="container">
                <h1 className="grey">No results available for this range.</h1>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Summary;
