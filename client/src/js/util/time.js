export function ConvertDateToString (date) {
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    return [year, month.length === 2 ? month: "0" + month, day.length === 2 ? day : "0" + day].join("-");
};
