const stage = d3.select("#stage");

const width = stage.node().clientWidth;
const height = stage.node().clientHeight;

const svg = stage
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", `0 0 ${width} ${height}`);

svg
  .append("image")
  .attr("href", "orz.svg")
  .attr("x", width * 0.15)
  .attr("y", height * 0.15)
  .attr("width", width * 0.7)
  .attr("height", height * 0.7);

svg
  .append("image")
  .attr("href", "barril.svg")
  .attr("x", width * 0.2)
  .attr("y", height * 0.1)
  .attr("width", width * 0.6)
  .attr("height", height * 0.8);
