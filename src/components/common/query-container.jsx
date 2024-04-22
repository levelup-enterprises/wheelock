import React, { useContext } from "react";
import { SearchContext } from "../../context/search";
import session from "../../services/session";

const QueryContainer = (props) => {
  const { search, updateSearch } = useContext(SearchContext);

  const removeQuery = () => {
    let query = search.query;
    // Remove values
    delete query[props.name];

    const container =
      search.container.length > 1
        ? search.container.filter((v) => v.key !== props.name)
        : [];
    // Update values
    session.set("searchQuery", { query: query });
    updateSearch({ query: query, container: container });

    // Add value back to filters
    let difference = props.defaultFilters;
    container.forEach((v) => {
      difference = props.defaultFilters.filter((k) => v.key !== k.name);
    });

    // Update filter list
    props.updateQuery(difference);
  };

  return (
    <div className="filters btn-filter">
      <span className="value">
        {props.empty
          ? props.properName
          : props.properName + ": " + props.relation + " " + props.value}
      </span>
      <span className="close-btn-filter" onClick={() => removeQuery()}>
        x
      </span>
    </div>
  );
};

export default QueryContainer;
