(function line_year_temp(){
  const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart_line_year_temp")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('sg_weather_year.csv').then(data => {
    let timeParse = d3.timeParse("%Y"); // parse time to JS format so code can read it

    for (let d of data) {
        d.mean_temp = +d.mean_temp;
        d.max_temperature = +d.max_temperature;
        d.year = timeParse(d.year); // using timeParse function we created above
    }

    console.log(data)

    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.year)) // returns an array
        .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()
        .domain([25,d3.max(data, d => d.max_temperature)]).nice() // nice to round up axis tick
        .range([height - margin.bottom, margin.top]);
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis") // adding a class to y-axis for scoping
      .call(d3.axisLeft(y)
        .tickSizeOuter(0)
        //.tickFormat(d => d + "%") // format to include %
        .tickSize(-width + margin.right + margin.left) // modified to meet at end of axis
      );

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Year");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Temperature (C)");
    
    let line_mean = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.mean_temp))
        //.curve(d3.curveNatural); // more: https://observablehq.com/@d3/d3-line#cell-244

    svg.append("path")
        .datum(data)
        .attr("d", line_mean)
        .attr("fill", "none")
        .attr("stroke", "steelblue");

    let line_max = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.max_temperature))

    svg.append("path")
        .datum(data)
        .attr("d", line_max)
        .attr("fill", "none")
        .attr("stroke", "orange"); 

    let swatchHTML = Swatches(d3.scaleOrdinal(["Max temperature", "Mean temperature"],['orange', 'steelblue']));

    d3.select("#chart_line_year_temp")
      .append("div")
      .node().innerHTML = swatchHTML;

  });
})();
