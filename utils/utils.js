import moment from "moment"

export function projectIdentifierFromProject(project) {
  return {
    sourceID: project.sourceID,
    sourceType: project.source,
    projectID: project.projectID,
    projectType: project.projectType
  }
}

// formats date to server expected "01-02-2022"
export function formatServerDate(date) {
  let dstr = date.toLocaleDateString('en-US').replaceAll("/", "-")
  let ts = dstr.split("-")
  if (ts[0].length == 1) { // must reformat
    ts[0] = `0${ts[0]}`
  }
  return ts.join("-")
}

export function formatYYMMDD(dateObj) {
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  let fmonth = month < 10 ? `0${month}` : month
  let fday = day < 10 ? `0${day}` : day
  return `${year}-${fmonth}-${fday}`
}

export function formatLongDate(date) {
  return moment(date).format("DD MMM YYYY")
}

export function formatAMPM(date) {
  let d = new Date(date)
  var hours = d.getHours()
  var minutes = d.getMinutes()
  var day = d.getDate()
  var month = d.getMonth()
  var year = d.getFullYear()
  var ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  var strTime = `${hours}:${minutes} ${ampm} - ${months[month]} ${day}, ${year}`
  return strTime;
}

export function daysBack(dateTS, nDays) {
  return dateTS - (86400000 * nDays) // 86400 seconds in a day
}

export function roundToHour(dateString) {
  let date = new Date(dateString)
  date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
  date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
  return date;
}

export function compareDates(roundedDate, entryDate) {
  let roundedEntryDate = roundToHour(entryDate)
  return roundedEntryDate.getTime() == roundedDate.getTime()
}

export function generateColor() {
  return Math.floor(Math.random() * 16777215).toString(16)
}

export function genID() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export function numFormatter(num, digits) {
  if (num < 1000) {
    return num.toPrecision(3)
  }
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });

  if (!digits) {
    digits = 2
  }
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}


export function toAlphaNumeric(s) {
  return s.replace(/[^a-z0-9]/gi, '');
}

export const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms));

export function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const filterNullIds = (ids) => ids.filter(id => id != '00000000-0000-0000-0000-000000000000')

export function convertToChartData(object) {
  let chartData = []
  object.map(item => chartData.push({ "name": item.name, "value": item.allocation }))
  return chartData
}

export const percentFormat = (num) => `${numFormatter(num * 100)}%`


