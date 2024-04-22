import React, { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "../context/user";
import { DataContext } from "../context/data";
import { SearchContext } from "../context/search";
import { getComments, getExport } from "../services/get";
import Pagination from "react-js-pagination";
import session from "../services/session";
import { toast } from "react-toastify";
import _ from "lodash";
// Components
import Loading from "../components/common/loading";
import Comment from "../components/comments/index";
import Button from "../components/common/button";

const Comments = (props) => {
  // Contexts
  const { data, updateData } = useContext(DataContext);
  const { search } = useContext(SearchContext);
  const { user } = useContext(UserContext);
  // States
  const [loading, setLoading] = useState(true);
  const [loadingMessage, updateLoadingMessage] = useState("Getting comments");
  const [reflow, toggleReflow] = useState("grid");
  const [comments, updateComments] = useState({});
  const [commentValues, updateCommentValues] = useState([]);
  const [totalComments, updateTotalComments] = useState(0);
  const [alreadyBuilt, toggleBuilt] = useState(false);
  const [exportMessage, updateExportMessage] = useState(null);
  const [exportFile, setExportFile] = useState(null);
  // Paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, updatePerPage] = useState(session.get("perPage", true) || 20);

  /** -------------------------------------------
   *# Get comments on date change
   * --------------------------------------------
   */
  const renderComments = useCallback(
    async (query = null) => {
      setLoading(true);
      const comments = session.get("comments");
      if (data.updateComments) {
        if (query || !comments) {
          const { success, error } = await getComments({
            search: search.query,
            date: data.dateRange,
            id: query && query.id,
            brand: query && query.brand,
          });
          if (success) {
            process.env.NODE_ENV === "development" && console.log(success);
            updateTotalComments(success.total);
            paginateResults(success.comments);
            !query && session.set("comments", success);
            updateCommentValues(success.comments);
            updateData({ updateComments: false });
            toggleBuilt(true);
            return;
          }
          error && toast.error(error.message);
        } else {
          updateTotalComments(comments.total);
          paginateResults(comments.comments);
        }
        updateData({ updateComments: false });
        toggleBuilt(true);
        setLoading(false);
        return;
      } else if (comments && !alreadyBuilt) {
        updateTotalComments(comments.total);
        paginateResults(comments.comments);
      }

      // Do pagination

      setLoading(false);
    },
    [data, alreadyBuilt, updateData, search]
  );

  useEffect(() => {
    props.id
      ? renderComments({ id: props.id, brand: props.brand })
      : renderComments();
    const display = session.get("displayPreference", true);
    display && handleReflow(display);
  }, [renderComments, props]);

  const handleReflow = (toggle) => {
    toggleReflow(toggle);
    session.set("displayPreference", toggle, true);
  };

  const handlePageChange = (pageNumber) => {
    paginateResults(null, pageNumber);
    setCurrentPage(pageNumber);
  };

  const handlePerPage = (value) => {
    console.log(value);
    updatePerPage(value);
    session.set("perPage", value, true);
    paginateResults(null, null, value);
  };

  const paginateResults = (values = null, pageNumber = null, pages = null) => {
    let offset = 0;
    pageNumber
      ? (offset = (pageNumber - 1) * (pages ? pages : perPage))
      : (offset = (currentPage - 1) * (pages ? pages : perPage));

    if (!values) {
      const sessionValues = session.get("comments");
      sessionValues
        ? (values = sessionValues.comments)
        : !_.isEmpty(commentValues) && (values = commentValues);
    }
    const pageData = values
      .slice(offset, offset + (pages ? pages : perPage))
      .map((v) => v);
    updateComments(<Comment workspace={user.workspace} comments={pageData} />);
  };

  const handleExport = async () => {
    updateExportMessage("Building export file");
    setLoading(true);
    const { success, error } = await getExport({
      search: search.query,
      date: data.dateRange,
    });
    if (success) {
      setExportFile(success);
    }
    error && console.log(error);
    setLoading(false);
  };

  return (
    <>
      <div className="split-wrapper">
        <div className="split-container">
          <div className="header-wrapper">
            <h6>
              Comments <span id="totalCount">{totalComments}</span>
            </h6>
            <div className="reflow-container">
              <Button
                className="btn reflow"
                title="Grid display"
                onClick={() => handleReflow("grid")}
              >
                <i className="fas fa-th"></i>
              </Button>

              <Button
                className="btn reflow"
                title="Row display"
                onClick={() => handleReflow("row")}
              >
                <i className="fas fa-bars"></i>
              </Button>
            </div>
            <div className="pagination-toggle-wrapper">
              <label>Show</label>
              <select
                className="form-control pagination-toggle"
                id="pagination-toggle"
                defaultValue={perPage}
                onChange={(e) => handlePerPage(parseInt(e.target.value))}
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>
            <div id="pagination">
              <Pagination
                hideDisabled
                hideNavigation
                activePage={currentPage}
                itemsCountPerPage={perPage}
                totalItemsCount={totalComments}
                pageRangeDisplayed={7}
                onChange={(e) => handlePageChange(e)}
              />
            </div>
            <Button
              id="export"
              className="btn btn-warning"
              onClick={() => handleExport()}
            >
              Export
            </Button>
          </div>
          {loading ? (
            <>
              {exportMessage ? (
                <Loading message={exportMessage} />
              ) : (
                <Loading message={loadingMessage} />
              )}
            </>
          ) : (
            <>
              {/* <div className="loading-wrapper"> */}
              <div className="comments-wrapper">
                {totalComments > 0 ? (
                  <div
                    id="displayComments"
                    className={reflow === "row" ? "single-column" : ""}
                  >
                    {comments}
                  </div>
                ) : (
                  <div className="no-results">
                    <div className="container">
                      <h1 className="grey">
                        No results available for this range.
                      </h1>
                    </div>
                  </div>
                )}
              </div>
              {/* </div> */}
              <div className="mini-charts-wrapper"></div>
            </>
          )}
        </div>
      </div>
      <div id="exportFrame">
        {exportFile && (
          <iframe src={exportFile} title="Export" frameBorder="0"></iframe>
        )}
      </div>
    </>
  );
};

export default Comments;
