export function ConvertDateToString (date) {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  return [year, month.length === 2 ? month: "0" + month, day.length === 2 ? day : "0" + day].join("-");
};

export function GetWeekStart(date) {
  return addDays(date, -date.getDay());
};

export function GetWeekEnd(date) {
  return addDays(date, 7-date.getDay()-1);
};

function addDays(date, days) {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};
