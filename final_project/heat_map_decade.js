(function heat_map(){
  const margin = {top: 80, right: 25, bottom: 30, left: 40},
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#chart_heat_map_decade")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("sg_weather.csv").then(data => {

  let timeParse = d3.timeParse("%Y-%m");

    for (let d of data) {
        d.Date = timeParse(d.month);
        d.Year = new Date(d.Date).getFullYear();
        d.Month = new Date(d.Date).getMonth();
        d.Decade = new Date(d.Date).getFullYear() - new Date(d.Date).getFullYear() % 10;
        d.maximum_rainfall_in_a_day = +d.maximum_rainfall_in_a_day;
        d.no_of_rainy_days = +d.no_of_rainy_days;
        d.total_rainfall = +d.total_rainfall;
      }

    console.log(data)

  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  const myGroups = Array.from(new Set(data.map(d => d.Month)))
  const myVars = Array.from(new Set(data.map(d => d.Decade)))

  // Build X scales and axis:
  const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.05);

  svg
    .append("g")
    .style("font-size", 15)
    .attr("transform", `translate(0, ${height})`)
    .call(
      d3
        .axisBottom(x)
        .tickSize(0)
        .tickFormat((d) => getMonthName(d).substring(0, 3))
    )
    .select(".domain")
    .remove();

  // Build Y scales and axis:
  const y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.05);
  svg.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  const myColor = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([1,100])

  d3.select("#chart_heat_map_decade")
      .append("div")
      .node()
      .appendChild(Legend(myColor));

  // create a tooltip
  const tooltip = d3.select("#chart_heat_map_decade")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event,d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  const mousemove = function(event,d) {
    tooltip
      .html("The mean total rainfall in " + getMonthName(d.Month) + " in the " + d.Decade + "'s was: " + d.total_rainfall + " mm.")
      .style("left", (event.x)/2 + "px")
      .style("top", (event.y)/2 + "px")
  }
  const mouseleave = function(event,d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  // add the squares
  svg.selectAll()
    .data(data, function(d) {return d.Month+':'+d.Decade;})
    .join("rect")
      .attr("x", function(d) { return x(d.Month) })
      .attr("y", function(d) { return y(d.Decade) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.total_rainfall)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
})

/*

// Add title to graph
svg.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
        .text("A d3.js heatmap");

// Add subtitle to graph
svg.append("text")
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("max-width", 400)
        .text("A short description of the take-away message of this chart.");
*/

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString('en-US', { month: 'long' });
}

})();
