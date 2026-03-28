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
  .attr("href", "assets/poster.svg")
  .attr("x", width * 0.75)
  .attr("y", height * 0.05)
  .attr("width", width * 0.2)
  .attr("height", height * 0.25);

svg
  .append("text")
  .attr("x", width * 0.5)
  .attr("y", height * 0.92)
  .attr("text-anchor", "middle")
  .attr("font-family", "Arial, sans-serif")
  .attr("font-size", "20px")
  .attr("fill", "#3b2f2f")
  .text("Clique no barril");

svg
  .append("text")
  .attr("x", width * 0.5)
  .attr("y", height * 0.96)
  .attr("text-anchor", "middle")
  .attr("font-family", "Arial, sans-serif")
  .attr("font-size", "16px")
  .attr("fill", "#666")
  .text("Arraste o personagem ao barril para escondê-lo");

const pirataInitialX = width * 0.3;
const pirataInitialY = height * 0.25;
const pirataWidth = width * 0.35;
const pirataHeight = height * 0.5;

const pirata = svg
  .append("image")
  .attr("href", "assets/pirata.svg")
  .attr("x", pirataInitialX)
  .attr("y", pirataInitialY)
  .attr("width", pirataWidth)
  .attr("height", pirataHeight)
  .style("cursor", "grab");

const barril = svg
  .append("image")
  .attr("href", "assets/barril.svg")
  .attr("x", width * 0.25)
  .attr("y", height * 0.2)
  .attr("width", width * 0.4)
  .attr("height", height * 0.6)
  .style("cursor", "pointer");

let pirataPopped = false;

barril.on("click", function () {
  if (!pirataPopped) {
    pirata.interrupt();
    pirata.style("pointer-events", "none");
    pirata
      .transition()
      .duration(500)
      .ease(d3.easeBounceOut)
      .attr("x", width * 0.55)
      .attr("y", height * 0.15)
      .on("end", function () {
        pirata.style("pointer-events", "auto");
        pirataPopped = true;
      });
  }
});

const drag = d3
  .drag()
  .on("start", function () {
    d3.select(this).style("cursor", "grabbing");
  })
  .on("drag", function (event) {
    d3.select(this)
      .attr("x", event.x - pirataWidth / 2)
      .attr("y", event.y - pirataHeight / 2);
  })
  .on("end", function () {
    d3.select(this).style("cursor", "grab");

    const currentX = parseFloat(d3.select(this).attr("x"));
    const currentY = parseFloat(d3.select(this).attr("y"));
    const barrilX = parseFloat(barril.attr("x"));
    const barrilY = parseFloat(barril.attr("y"));

    const distance = Math.sqrt(
      Math.pow(currentX - barrilX, 2) + Math.pow(currentY - barrilY, 2),
    );

    if (distance < width * 0.25) {
      d3.select(this)
        .transition()
        .duration(300)
        .attr("x", pirataInitialX)
        .attr("y", pirataInitialY)
        .on("end", function () {
          pirata.style("pointer-events", "none");
          pirataPopped = false;
        });
    }
  });

pirata.call(drag);
pirata.style("pointer-events", "none");
