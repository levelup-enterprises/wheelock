import React, { useReducer } from "react";
import session from "../services/session";
import { addDays, startOfWeek, endOfWeek, format } from "date-fns";

let reducer = (data, updateData) => {
  return { ...data, ...updateData };
};

let initialState = {
  dateRange:
    format(startOfWeek(addDays(new Date(), -7)), "MM/dd/yyyy") +
    " - " +
    format(endOfWeek(addDays(new Date(), -7)), "MM/dd/yyyy"),
  updateSummary: true,
  updateComments: true,
};

const initialize = () => {
  const dateRange = session.get("dateRange");
  dateRange && (initialState.dateRange = dateRange);
  return initialState;
};

const DataContext = React.createContext();

function DataProvider(props) {
  const [data, updateData] = useReducer(reducer, initialize());

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {props.children}
    </DataContext.Provider>
  );
}

export { DataContext, DataProvider };
