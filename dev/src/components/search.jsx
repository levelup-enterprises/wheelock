import React, { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "../context/user";
import { SearchContext } from "../context/search";
import { DataContext } from "../context/data";
import session from "../services/session";
import _ from "lodash";
import QueryContainer from "./common/query-container";
import { workspaceFilters } from "../searchFilters";

const Search = () => {
  // Context
  const { user } = useContext(UserContext);
  const { search, updateSearch } = useContext(SearchContext);
  const { updateData } = useContext(DataContext);

  // Define search values
  const [filter, setFilter] = useState("");
  const [relation, setRelation] = useState("equals");
  const [helper, setHelper] = useState("-");
  const [textField, updateTextField] = useState("");
  // Define filters
  const [filters, updateFilters] = useState(
    workspaceFilters[user.workspace.type] || ""
  );
  const [relationFilters, updateRelationFilters] = useState([]);
  const [helperFilters, updateHelperFilters] = useState([]);
  // Display filters
  const [showSearchFilter, toggleSearchFilter] = useState(false);

  const removeQuery = useCallback((list) => {
    updateFilters(list);
    handleSearch();
  }, []);

  useEffect(() => {
    updateFilters(workspaceFilters[user.workspace.type]);

    // Update search field
    const text = session.get("searchQuery") || null;
    text && updateTextField(text.query.search);
    // Update filter container
    // let container = session.get("searchContainer");
    // if (container) {
    //   container = container.map((v) => {
    //     return (
    //       <QueryContainer
    //         key={v.key}
    //         name={v.key}
    //         properName={v.props.properName}
    //         relation={v.props.relation}
    //         value={v.props.value}
    //         empty={v.props.empty}
    //         defaultFilters={v.props.defaultFilters}
    //         updateQuery={(e) => removeQuery(e)}
    //       />
    //     );
    //   });
    //   updateSearch({ container: container });
    // } else
    if (text) {
      // console.log(text);
      const container = Object.entries(text.query).reduce((result, v) => {
        if (v[0] !== "search") {
          const properName = workspaceFilters[user.workspace.type].find(
            (f) => f.name === v[0]
          );
          result.push(
            <QueryContainer
              key={v[0]}
              name={v[0]}
              properName={properName.value}
              relation={v[1][0]}
              value={v[1][1]}
              empty={v[1][1] === undefined ? true : false}
              defaultFilters={filters}
              updateQuery={(e) => removeQuery(e)}
            />
          );
        }
        return result;
      }, []);
      console.log(container);
      updateSearch({ container: container });
    }
  }, [updateSearch, user, removeQuery, filters]);

  const handleFilters = () => {
    toggleSearchFilter(!showSearchFilter);
  };

  const handleRelationFilters = (filter) => {
    setFilter(filter);
    switch (filter) {
      case "accomplish":
        updateHelperFilters(["-", "NA", "Yes", "No"]);
        updateRelationFilters(["equals", "does not equal"]);
        break;
      case "helpful":
        updateHelperFilters(["-", "Yes", "No"]);
        updateRelationFilters(["equals", "does not equal"]);
        break;
      case "survey_trigger":
        updateHelperFilters(["-", "Auto", "Forced", "Manual"]);
        updateRelationFilters(["equals", "does not equal"]);
        break;
      case "device":
        updateHelperFilters(["-", "Desktop", "Tablet", "Mobile"]);
        updateRelationFilters(["equals", "does not equal"]);
        break;
      case "mobile_os":
        updateHelperFilters(["-", "Android", "iOS"]);
        updateRelationFilters(["equals", "does not equal"]);
        break;
      case "rating":
        updateHelperFilters([
          "-",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
        ]);
        updateRelationFilters([
          "equals",
          "does not equal",
          "is greater than",
          "is less than",
          "is greater than or equal to",
          "is less than or equal to",
        ]);
        break;
      case "nps":
        updateHelperFilters([
          "-",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
        ]);
        updateRelationFilters([
          "equals",
          "does not equal",
          "is greater than",
          "is less than",
          "is greater than or equal to",
          "is less than or equal to",
        ]);
        break;
      default:
        updateHelperFilters([]);
        updateRelationFilters([]);
        handleHelpers("", filter);
    }
  };

  const handleHelpers = (value, empty = null) => {
    setHelper(value);
    let filtered = empty ? empty : filter;

    const properName = filters.find((v) => v.name === filtered);

    // Allow duplicates
    if (search.query) {
      search.query[filter] && (filtered = filter + ".2");
    }

    // Build selected filter
    const container = [
      ...search.container,
      <QueryContainer
        key={filtered}
        name={filtered}
        properName={properName.value}
        relation={relation}
        value={value}
        empty={empty}
        defaultFilters={filters}
        updateQuery={(e) => removeQuery(e)}
      />,
    ];

    let searchQuery = {};
    empty
      ? (searchQuery = { ...search.query, [filtered]: [] })
      : (searchQuery = { ...search.query, [filtered]: [relation, value] });

    updateSearch({ query: searchQuery, container: container });

    session.set("searchQuery", { query: searchQuery });
    // session.set("searchContainer", container);

    // Remove selected filter from list
    clearSelector();
  };

  const clearSelector = () => {
    filter !== "nps" &&
      filter !== "rating" &&
      updateFilters(filters.filter((v) => v.name !== filter));
    toggleSearchFilter(false);
    setFilter("");
    setRelation("equals");
    setHelper("-");
    updateRelationFilters([]);
    updateHelperFilters([]);
  };

  const handleSearch = (e) => {
    e && e.preventDefault();
    session.remove("comments");
    const searchQuery = session.get("searchQuery") || {};
    session.set("searchQuery", {
      query: { ...searchQuery.query, search: textField },
    });
    console.log(searchQuery);

    updateSearch({ query: { ...search.query, search: textField } });
    updateData({ updateComments: true });
  };

  const handleReset = (e) => {
    e.preventDefault();
    clearSelector();
    removeQuery(filters);
    updateSearch({ query: "", container: [] });
    updateTextField("");
    session.remove("searchContainer");
    session.remove("searchQuery");
    session.remove("searchText");
  };

  return (
    <div className="container-fluid px-0 full-height">
      <form
        className="form-inline"
        id="searchForm"
        onSubmit={(e) => handleSearch(e)}
      >
        <button
          id="addFilter"
          type="button"
          className="btn btn-secondary"
          onClick={() => handleFilters()}
        >
          Add Filter
        </button>
        <div className="search-wrapper">
          <div className="filter-wrapper">
            <div className="filter-container" id="builder">
              {search.container}
            </div>
            {showSearchFilter && (
              <select
                className="select-filter"
                id="searchFilter"
                onChange={(e) => handleRelationFilters(e.target.value)}
              >
                <option>Select Filter</option>
                {!_.isEmpty(filters) &&
                  filters.map((v, i) => (
                    <option key={i} value={v.name}>
                      {v.value}
                    </option>
                  ))}
              </select>
            )}
            {!_.isEmpty(relationFilters) && (
              <select
                className="select-filter"
                id="relationFilter"
                onChange={(e) => setRelation(e.target.value)}
              >
                {relationFilters.map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            )}

            {!_.isEmpty(helperFilters) && (
              <select
                className="select-filter"
                id="helperFilter"
                onChange={(e) => handleHelpers(e.target.value)}
              >
                {helperFilters.map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            )}
          </div>
          <input
            type="text"
            className="plain-input"
            id="search"
            data-filter
            aria-describedby="search"
            placeholder="Search"
            autoComplete="off"
            value={textField}
            onChange={(e) => updateTextField(e.target.value)}
          />

          {search.container.length > 0 && (
            <button
              id="resetSearch"
              className="btn btn-link"
              title="Reset search"
              onClick={(e) => handleReset(e)}
            >
              Clear
            </button>
          )}
        </div>
        <button
          type="submit"
          id="searchBtn"
          className="btn btn-primary btn-auto"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
