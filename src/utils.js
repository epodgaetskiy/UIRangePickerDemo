import moment from "moment";

export const getDates = ({ type, days }) => {
  let dates;
  const today = moment().toDate();
  switch (type) {
    case "lastDays":
      dates = {
        from: moment()
          .subtract(days - 1, "days")
          .toDate(),
        to: today
      };
      break;
    case "currentMonth":
      dates = {
        from: moment()
          .startOf("month")
          .toDate(),
        to: today
      };
      break;
    case "previousMonth":
      dates = {
        from: moment()
          .subtract(1, "months")
          .startOf("month")
          .toDate(),
        to: moment()
          .subtract(1, "months")
          .endOf("month")
          .toDate()
      };
      break;
    case "currentQuater":
      dates = {
        from: moment()
          .startOf("quarter")
          .toDate(),
        to: today
      };
      break;
    case "previousQuater":
      dates = {
        from: moment()
          .subtract(1, "quarter")
          .startOf("quarter")
          .toDate(),
        to: moment()
          .subtract(1, "quarter")
          .endOf("quarter")
          .toDate()
      };
      break;
    case "currentYear":
      dates = {
        from: moment()
          .startOf("year")
          .toDate(),
        to: today
      };
      break;
    case "allTime":
      dates = {
        from: moment("01/01/2010", "M-D-Y").toDate(),
        to: today
      };
      break;
    default:
      dates = {};
  }
  return dates;
};

export const CUSTOM_RANGES = [
  {
    type: "lastDays",
    days: 7,
    name: "Last 7 days"
  },
  {
    type: "lastDays",
    days: 14,
    name: "Last 14 days"
  },
  {
    type: "lastDays",
    days: 30,
    name: "Last 30 days"
  },
  {
    type: "lastDays",
    days: 90,
    name: "Last 90 days"
  },
  {
    type: "currentMonth",
    name: "Current month"
  },
  {
    type: "previousMonth",
    name: "Previous month"
  },
  {
    type: "currentQuater",
    name: "Current quater"
  },
  {
    type: "previousQuater",
    name: "Previous quater"
  },
  {
    type: "currentYear",
    name: "Current Year"
  },
  {
    type: "allTime",
    name: "All time"
  }
];
