(function beeswarm_temp(){
d3.csv("sg_weather.csv").then(data => {

    console.log(data)

    /*data = data.filter(d => d.Age != null);
    console.log(data);  */
    let timeParse = d3.timeParse("%Y-%m");

    for (let d of data) {
        d.Date = timeParse(d.month);
        d.Year = new Date(d.Date).getFullYear();
        d.Month = new Date(d.Date).getMonth();
        d.Decade = new Date(d.Date).getFullYear() - new Date(d.Date).getFullYear() % 10;
        d.max_temperature = +d.max_temperature;
        d.temp_extremes_min = +d.temp_extremes_min;
        d.mean_temp = +d.mean_temp;
        /*years.add(d.Year); // push unique values to Set */
      }

    console.log(data)

    
    let chart_max = BeeswarmChart(data, {
        x: d => d.max_temperature,
        group: d => d.Decade, 
        label: "Maximum Temperature (C)→",
        type: d3.scaleLinear, // try d3.scaleLog
        title: d => `${d.Year}: ${d.Month}\n${d.max_temperature.toLocaleString("en")} C.`,
        width: 2000,
        marginTop: 150,
      });

    document.getElementById("chart_max").appendChild(chart_max);

    let swatchHTML = Swatches(d3.scaleOrdinal(["1980", "1990", "2000", "2010", "2020"],d3.schemeSpectral[5]));

    d3.select("#chart_max")
        .append("div")
        .node().innerHTML = swatchHTML;

    /* 
    let chart_min = BeeswarmChart(data, {
        x: d => d.temp_extremes_min,
        group: d => d.Decade, 
        label: "Minimum Temperature (C)→",
        type: d3.scaleLinear, // try d3.scaleLog
        title: d => `${d.Year}: ${d.Month}\n${d.temp_extremes_min.toLocaleString("en")} C.`,
        width: 2000,
        marginTop: 150,
      });

    document.getElementById("chart_min").appendChild(chart_min); */ 

    let chart_mean = BeeswarmChart(data, {
        x: d => d.mean_temp,
        group: d => d.Decade, // is this correct? */
        label: "Mean Temperature (C)→",
        type: d3.scaleLinear, // try d3.scaleLog
        title: d => `${d.Year}: ${d.Month}\n${d.mean_temp.toLocaleString("en")} C.`,
        width: 2000,
        marginTop: 150,
      });

    document.getElementById("chart_mean").appendChild(chart_mean);

    let swatchHTML2 = Swatches(d3.scaleOrdinal(["1980", "1990", "2000", "2010", "2020"],d3.schemeSpectral[5]));

    d3.select("#chart_mean")
        .append("div")
        .node().innerHTML = swatchHTML2;
    
});

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/beeswarm
function BeeswarmChart(data, {
    value = d => d, // convenience alias for x
    label, // convenience alias for xLabel
    type = d3.scaleLinear, // convenience alias for xType
    domain, // convenience alias for xDomain
    x = value, // given d in data, returns the quantitative x value
    title = null, // given d in data, returns the title
    group, // given d in data, returns an (ordinal) value for color
    groups, // an array of ordinal values representing the data groups
    colors = d3.schemeSpectral[5], // an array of color strings, for the dots
    radius = 3, // (fixed) radius of the circles
    padding = 1.5, // (fixed) padding between the circles
    marginTop = 10, // top margin, in pixels
    marginRight = 20, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 20, // left margin, in pixels
    width = 640, // outer width, in pixels
    height, // outer height, in pixels
    xType = type, // type of x-scale, e.g. d3.scaleLinear
    xLabel = label, // a label for the x-axis
    xDomain = domain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight] // [left, right]
    } = {}) {
    // Compute values.
    const X = d3.map(data, x).map(x => x == null ? NaN : +x);
    const T = title == null ? null : d3.map(data, title);
    const G = group == null ? null : d3.map(data, group);

    // Compute which data points are considered defined.
    const I = d3.range(X.length).filter(i => !isNaN(X[i]));

    // Compute default domains.
    if (xDomain === undefined) xDomain = d3.extent(X);
    if (G && groups === undefined) groups = d3.sort(G);

    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const color = group == null ? null : d3.scaleOrdinal(groups, colors);

    // Compute the y-positions.
    const Y = dodge(I.map(i => xScale(X[i])), radius * 2 + padding);

    // Compute the default height;
    if (height === undefined) height = d3.max(Y) + (radius + padding) * 2 + marginTop + marginBottom;

    // Given an array of x-values and a separation radius, returns an array of y-values.
    function dodge(X, radius) {
        const Y = new Float64Array(X.length);
        const radius2 = radius ** 2;
        const epsilon = 1e-3;
        let head = null, tail = null;

        // Returns true if circle ⟨x,y⟩ intersects with any circle in the queue.
        function intersects(x, y) {
        let a = head;
        while (a) {
            const ai = a.index;
            if (radius2 - epsilon > (X[ai] - x) ** 2 + (Y[ai] - y) ** 2) return true;
            a = a.next;
        }
        return false;
        }

        // Place each circle sequentially.
        for (const bi of d3.range(X.length).sort((i, j) => X[i] - X[j])) {

        // Remove circles from the queue that can’t intersect the new circle b.
        while (head && X[head.index] < X[bi] - radius2) head = head.next;

        // Choose the minimum non-intersecting tangent.
        if (intersects(X[bi], Y[bi] = 0)) {
            let a = head;
            Y[bi] = Infinity;
            do {
            const ai = a.index;
            let y = Y[ai] + Math.sqrt(radius2 - (X[ai] - X[bi]) ** 2);
            if (y < Y[bi] && !intersects(X[bi], y)) Y[bi] = y;
            a = a.next;
            } while (a);
        }
    
        // Add b to the queue.
        const b = {index: bi, next: null};
        if (head === null) head = tail = b;
        else tail = tail.next = b;
        }
    
        return Y;
    }

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis)
        .call(g => g.append("text")
            .attr("x", width)
            .attr("y", marginBottom - 4)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(xLabel));

    const dot = svg.append("g")
        .selectAll("circle")
        .data(I)
        .join("circle")
        .attr("cx", i => xScale(X[i]))
        .attr("cy", i => height - marginBottom - radius - padding - Y[i])
        .attr("r", radius);

    if (G) dot.attr("fill", i => color(G[i]));

    if (T) dot.append("title")
        .text(i => T[i]);

    return svg.node();
}

})();