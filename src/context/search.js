import React, { useReducer } from "react";
import session from "../services/session";

let reducer = (search, updateSearch) => {
  return { ...search, ...updateSearch };
};

let initialState = {
  query: "",
  container: [],
};

const initialize = () => {
  const search = session.get("searchQuery");
  search && (initialState.query = search.query);
  return initialState;
};

const SearchContext = React.createContext();

function SearchProvider(props) {
  const [search, updateSearch] = useReducer(reducer, initialize());

  return (
    <SearchContext.Provider value={{ search, updateSearch }}>
      {props.children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
