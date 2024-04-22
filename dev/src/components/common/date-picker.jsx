import React, { useState, useContext, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import { startOfWeek, endOfWeek, addDays, format } from "date-fns";
import { DataContext } from "../../context/data";
import { defaultStaticRanges } from "../../services/dates";
import session from "../../services/session";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Button from "./button";

const DatePicker = ({ show, toggle }) => {
  const { updateData } = useContext(DataContext);
  const [selected, setSelected] = useState([
    {
      startDate: startOfWeek(addDays(new Date(), -7)),
      endDate: endOfWeek(addDays(new Date(), -7)),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const time = session.get("dateRange");
    if (time) {
      const times = time.split(" - ");
      setSelected([
        {
          startDate: new Date(times[0]),
          endDate: new Date(times[1]),
          key: "selection",
        },
      ]);
      updateData({ dateRange: time });
    }
  }, [updateData]);

  const updateSelected = (time) => {
    setSelected([time]);
  };

  const updateDates = () => {
    const times =
      format(new Date(selected[0].startDate), "MM/dd/yyyy") +
      " - " +
      format(new Date(selected[0].endDate), "MM/dd/yyyy");
    session.remove("results");
    session.remove("comments");
    session.set("dateRange", times);
    updateData({ dateRange: times, updateSummary: true, updateComments: true });
    toggle();
  };

  return (
    <>
      {show && (
        <div className="date-picker-wrapper">
          <DateRangePicker
            ranges={selected}
            direction="horizontal"
            className="date-picker"
            staticRanges={defaultStaticRanges}
            inputRanges={[]}
            showPreview={false}
            showSelectionPreview={false}
            moveRangeOnFirstSelection={false}
            onChange={(item) => updateSelected(item.selection)}
          />
          <Button
            text="Search"
            className="btn btn-primary"
            onClick={() => updateDates()}
          />
        </div>
      )}
    </>
  );
};

export default DatePicker;
