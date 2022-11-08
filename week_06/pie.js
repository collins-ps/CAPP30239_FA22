// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/stacked-bar-chart

d3.json("a3cleanedonly2015.json").then(data => {

    let newData = [
        { state: 'AL', count: 0 },
        { state: 'AK', count: 0 },
        { state: 'AS', count: 0 },
        { state: 'AZ', count: 0 },
        { state: 'AR', count: 0 },
        { state: 'CA', count: 0 },
        { state: 'CO', count: 0 },
        { state: 'CT', count: 0 },
        { state: 'DE',count: 0 },
        { state: 'DC', count: 0 },
        { state: 'FM', count: 0 },
        { state: 'FL',count: 0 },
        { state: 'GA',count: 0 },
        { state: 'GU', count: 0 },
        { state: 'HI',count: 0 },
        { state: 'ID', count: 0 },
        { state: 'IL', count: 0 },
        { state: 'IN', count: 0 },
        { state: 'IA', count: 0 },
        { state: 'KS', count: 0 },
        { state: 'KY', count: 0 },
        { state: 'LA', count: 0 },
        { state: 'ME', count: 0 },
        { state: 'MH', count: 0 },
        { state: 'MD', count: 0 },
        { state: 'MA', count: 0 },
        { state: 'MI', count: 0 },
        { state: 'MN', count: 0 },
        { state: 'MS', count: 0 },
        { state: 'MO', count: 0 },
        { state: 'MT', count: 0 },
        { state: 'NE', count: 0 },
        { state: 'NV', count: 0 },
        { state: 'NH', count: 0 },
        { state: 'NJ', count: 0 },
        { state: 'NM', count: 0 },
        { state: 'NY', count: 0 },
        { state: 'NC', count: 0 },
        { state: 'ND', count: 0 },
        { state: 'MP', count: 0 },
        { state: 'OH', count: 0 },
        { state: 'OK', count: 0 },
        { state: 'OR', count: 0 },
        { state: 'PW', count: 0 },
        { state: 'PA', count: 0 },
        { state: 'PR', count: 0 },
        { state: 'RI', count: 0 },
        { state: 'SC', count: 0 },
        { state: 'SD', count: 0 },
        { state: 'TN', count: 0 },
        { state: 'TX', count: 0 },
        { state: 'UT', count: 0 },
        { state: 'VT', count: 0 },
        { state: 'VI', count: 0 },
        { state: 'VA', count: 0 },
        { state: 'WA', count: 0 },
        { state: 'WV', count: 0 },
        { state: 'WI', count: 0 },
        { state: 'WY', count: 0 }
    ];

    for(var d of data) {
         let nd = newData.find(nd => nd.state == d["State"]);
         nd.count += 1;
    }

    console.log(newData)

    let chart = DonutChart(newData, {
        name: d => d.state,
        value: d => d.count,
        width: 1040,
        height: 500
      })

    document.getElementById("chart").appendChild(chart);

});

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/donut-chart
function DonutChart(data, {
    name = ([x]) => x,  // given d in data, returns the (ordinal) label
    value = ([, y]) => y, // given d in data, returns the (quantitative) value
    title, // given d in data, returns the title text
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    innerRadius = Math.min(width, height) / 3, // inner radius of pie, in pixels (non-zero for donut)
    outerRadius = Math.min(width, height) / 2, // outer radius of pie, in pixels
    labelRadius = (innerRadius + outerRadius) / 2, // center radius of labels
    format = ",", // a format specifier for values (in the label)
    names, // array of names (the domain of the color scale)
    colors, // array of colors for names
    stroke = innerRadius > 0 ? "none" : "white", // stroke separating widths
    strokeWidth = 1, // width of stroke separating wedges
    strokeLinejoin = "round", // line join of stroke separating wedges
    padAngle = stroke === "none" ? 1 / outerRadius : 0, // angular separation between wedges
  } = {}) {
    // Compute values.
    const N = d3.map(data, name);
    const V = d3.map(data, value);
    const I = d3.range(N.length).filter(i => !isNaN(V[i]));
  
    // Unique the names.
    if (names === undefined) names = N;
    names = new d3.InternSet(names);
  
    // Chose a default color scheme based on cardinality.
    if (colors === undefined) colors = d3.schemeSpectral[names.size];
    if (colors === undefined) colors = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), names.size);
  
    // Construct scales.
    const color = d3.scaleOrdinal(names, colors);
  
    // Compute titles.
    if (title === undefined) {
      const formatValue = d3.format(format);
      title = i => `${N[i]}\n${formatValue(V[i])}`;
    } else {
      const O = d3.map(data, d => d);
      const T = title;
      title = i => T(O[i], i, data);
    }
  
    // Construct arcs.
    const arcs = d3.pie().padAngle(padAngle).sort(null).value(i => V[i])(I);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
    
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        // .attr("transform", `translate(${-width / 2}px, ${-height / 2}px)`)
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linejoin", strokeLinejoin)
      .selectAll("path")
      .data(arcs)
      .join("path")
        .attr("fill", d => color(N[d.data]))
        .attr("d", arc)
      .append("title")
        .text(d => title(d.data));
  
    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 5)
        .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .selectAll("tspan")
      .data(d => {
        const lines = `${title(d.data)}`.split(/\n/);
        return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 1);
      })
      .join("tspan")
        .attr("x", 0)
        .attr("y", (_, i) => `${i * 1.1}em`)
        .attr("font-weight", (_, i) => i ? null : "bold")
        .text(d => d);
  
    return Object.assign(svg.node(), {scales: {color}});
  }