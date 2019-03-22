import { csvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
  return function(d) {
    d.timestamp = parse(d.timestamp);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
}

const parseDate = timeParse("%Y-%m-%d");

export function getData(TICKER) {
  const promise = fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${TICKER}&outputsize=compact&apikey=ZV7Y9QKGXRHCY0A4&datatype=csv`
  )
    .then(response => response.text())
    .then(data => csvParse(data, parseData(parseDate)).reverse());
  return promise;
}
