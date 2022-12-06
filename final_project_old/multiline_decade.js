let height = 500,
    width = 800,
    margin = ({ top: 25, right: 30, bottom: 35, left: 30 })
    innerWidth = width - margin.left - margin.right;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.csv("sg_weather.csv").then(data => {
  let timeParse = d3.timeParse("%Y-%m");

  let deacdes = new Set(); 

  for (let d of data) {
    d.Date = timeParse(d.month);
    d.Year = new Date(d.Date).getFullYear();
    d.Month = new Date(d.Date).getMonth();
    d.Decade = new Date(d.Date).getFullYear() - new Date(d.Date).getFullYear() % 10;
    d.total_rainfall = +d.total_rainfall;
    deacdes.add(d.Decade); // push unique values to Set
  }

  console.log(data)

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.Month))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain([0,d3.max(data, d => d.total_rainfall)]).nice() // using extent because values are less than 0. initially: .domain(d3.extent(data, d => d.total_rainfall)).nice()
    .range([height - margin.bottom, margin.top]);

  // Y Axis first
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y)
      .tickSize(-innerWidth)
      /*.tickFormat(d => d + "%")*/
    );

  // X Axis second because we want it to be placed on top
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.top})`)
    .call(d3.axisBottom(x)
      .tickSizeOuter(0)
      .tickSizeInner(0)
      .tickFormat(d3.timeFormat("%b"))
    );

  let line = d3.line()
    .x(d => x(d.Month))
    .y(d => y(d.total_rainfall));
 
  // looping through set
  for (let decade of decades) { 
    //.filter filters data in D3
    let decadeData = data.filter(d => d.Decade === decade);

    let g = svg.append("g")
      .attr("class", "decade")
      .on('mouseover', function () {
        // set/remove highlight class
        // highlight class defined in html
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select(this).classed("highlight", true);
      });

    // USA selected in blue on load of page
    if (decade === "2020") {
      g.classed("highlight", true);
    }

    g.append("path")
      .datum(decadeData) // datum is a single result from data
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", line)

    // find position of last piece to position end of line labels
    let lastEntry = decadeData[decadeData.length - 1];

    g.append("text")
      .text(decade)
      .attr("x", x(lastEntry.Month))
      .attr("y", y(lastEntry.total_rainfall))
      .attr("dx", "5px") // shifting attribute in svg
      .attr("dominant-baseline", "middle")
      .attr("fill", "#999");
  }
  
});

d3.select("#legend")
  .node()
  .appendChild(
    Legend(
      d3.scaleTime(
        Array.from({length: 2022}, (_, index) => index + 1982),
        d3.schemePurples[41]
      ),
      { title: "Deacde" }
    ));