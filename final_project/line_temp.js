/* D3 Line Chart */

const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('sg_weather.csv').then(data => {
  let timeParse = d3.timeParse("%Y-%m");

  let years = new Set(); 

  for (let d of data) {
    d.Date = timeParse(d.month);
    d.Year = new Date(d.Date).getFullYear();
    d.Month = new Date(d.Date).getMonth();
    d.Decade = new Date(d.Date).getFullYear() - new Date(d.Date).getFullYear() % 10;
    d.max_temperature = +d.max_temperature;
    d.temp_extremes_min = +d.temp_extremes_min;
    d.mean_temp = +d.mean_temp;
    years.add(d.Year); // push unique values to Set
  }

  console.log(data)

    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Month)) // returns an array
        .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()
        .domain([31,d3.max(data, d => d.max_temperature)]).nice() // nice to round up axis tick
        .range([height - margin.bottom, margin.top]);
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis") // adding a class to y-axis for scoping
      .call(d3.axisLeft(y)
        .tickSizeOuter(0)
        /*.tickFormat(d => d + "%") // format to include % */
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
      .text("Month");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Mean Temperature (C)");

    for (let i = 1982; i < 1990; i++) {
      let data1 = data.filter(d => d.Year === i);

      let line = d3.line()
          .x(d => x(d.Month))
          .y(d => y(d.max_temperature))

      svg.append("path")
          .datum(data1)
          .attr("d", line)
          .attr("fill", "none")
          .attr("stroke", "steelblue");
    }

    for (let i = 1990; i < 2000; i++) {
      let data1 = data.filter(d => d.Year === i);

      let line = d3.line()
          .x(d => x(d.Month))
          .y(d => y(d.max_temperature))

      svg.append("path")
          .datum(data1)
          .attr("d", line)
          .attr("fill", "none")
          .attr("stroke", "green");
    }
    
    for (let i = 2000; i < 2010; i++) {
      let data1 = data.filter(d => d.Year === i);

      let line = d3.line()
          .x(d => x(d.Month))
          .y(d => y(d.max_temperature))

      svg.append("path")
          .datum(data1)
          .attr("d", line)
          .attr("fill", "none")
          .attr("stroke", "yellow");
    }

    for (let i = 2010; i < 2020; i++) {
      let data1 = data.filter(d => d.Year === i);

      let line = d3.line()
          .x(d => x(d.Month))
          .y(d => y(d.max_temperature))

      svg.append("path")
          .datum(data1)
          .attr("d", line)
          .attr("fill", "none")
          .attr("stroke", "orange");
    }

    for (let i = 2020; i < 2023; i++) {
      let data1 = data.filter(d => d.Year === i);

      let line = d3.line()
          .x(d => x(d.Month))
          .y(d => y(d.max_temperature))

      svg.append("path")
          .datum(data1)
          .attr("d", line)
          .attr("fill", "none")
          .attr("stroke", "red");
    }
  });