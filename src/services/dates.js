import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  differenceInCalendarDays,
  startOfYear,
  endOfYear,
  addYears,
  startOfQuarter,
  addQuarters,
  endOfQuarter,
} from "date-fns";

const defineds = {
  // Weeks
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  // Today / Yesterday
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  // Months
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  // Quarters
  startOfThisQuarter: startOfQuarter(new Date()),
  endOfThisQuarter: endOfDay(new Date()),
  startOfLastQuarter: startOfQuarter(addQuarters(new Date(), -1)),
  endOfLastQuarter: endOfQuarter(addQuarters(new Date(), -1)),
  // Years
  startOfThisYear: startOfYear(new Date()),
  endOfThisYear: endOfDay(new Date()),
  startOfLastYear: startOfYear(addMonths(new Date(), -12)),
  endOfLastYear: endOfYear(addYears(new Date(), -1)),
  // All
  startOfAll: startOfDay(new Date(2019, 6, 25)),
  endOfAll: endOfDay(new Date()),
};

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    );
  },
};

const createStaticRanges = (ranges) => {
  return ranges.map((range) => ({
    ...staticRangeHandler,
    ...range,
  }));
};

export const defaultStaticRanges = createStaticRanges([
  {
    label: "Yesterday",
    range: () => ({
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday,
      selection: "Yesterday",
    }),
  },

  {
    label: "This Week",
    range: () => ({
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfToday,
      selection: "This Week",
    }),
  },
  {
    label: "Last Week",
    range: () => ({
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek,
      selection: "Last Week",
    }),
  },
  {
    label: "This Month",
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfToday,
      selection: "This Month",
    }),
  },
  {
    label: "Last Month",
    range: () => ({
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth,
      selection: "Last Month",
    }),
  },
  {
    label: "This Quarter",
    range: () => ({
      startDate: defineds.startOfThisQuarter,
      endDate: defineds.endOfToday,
      selection: "This Quarter",
    }),
  },
  {
    label: "Last Quarter",
    range: () => ({
      startDate: defineds.startOfLastQuarter,
      endDate: defineds.endOfLastQuarter,
      selection: "Last Quarter",
    }),
  },
  {
    label: "This Year",
    range: () => ({
      startDate: defineds.startOfThisYear,
      endDate: defineds.endOfToday,
      selection: "This Year",
    }),
  },
  {
    label: "Last Year",
    range: () => ({
      startDate: defineds.startOfLastYear,
      endDate: defineds.endOfLastYear,
      selection: "Last Year",
    }),
  },
  {
    label: "All",
    range: () => ({
      startDate: defineds.startOfAll,
      endDate: defineds.endOfAll,
      selection: "All",
    }),
  },
]);

export const defaultInputRanges = [
  {
    label: "days up to today",
    range(value) {
      return {
        startDate: addDays(
          defineds.startOfToday,
          (Math.max(Number(value), 1) - 1) * -1
        ),
        endDate: defineds.endOfToday,
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.endDate, defineds.endOfToday)) return "-";
      if (!range.startDate) return "∞";
      return differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
    },
  },
  {
    label: "days starting today",
    range(value) {
      const today = new Date();
      return {
        startDate: today,
        endDate: addDays(today, Math.max(Number(value), 1) - 1),
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.startDate, defineds.startOfToday)) return "-";
      if (!range.endDate) return "∞";
      return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
    },
  },
];
