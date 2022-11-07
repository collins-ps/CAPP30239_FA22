// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/stacked-bar-chart

d3.json("a3cleanedonly2015.json").then(data => {

    function StackedBarChart(data, {
        x = (d, i) => i, // given d in data, returns the (ordinal) x-value
        y = d => d, // given d in data, returns the (quantitative) y-value
        z = () => 1, // given d in data, returns the (categorical) z-value
        title, // given d in data, returns the title text
        marginTop = 30, // top margin, in pixels
        marginRight = 0, // right margin, in pixels
        marginBottom = 30, // bottom margin, in pixels
        marginLeft = 40, // left margin, in pixels
        width = 640, // outer width, in pixels
        height = 400, // outer height, in pixels
        xDomain, // array of x-values
        xRange = [marginLeft, width - marginRight], // [left, right]
        xPadding = 0.1, // amount of x-range to reserve to separate bars
        yType = d3.scaleLinear, // type of y-scale
        yDomain, // [ymin, ymax]
        yRange = [height - marginBottom, marginTop], // [bottom, top]
        zDomain, // array of z-values
        offset = d3.stackOffsetDiverging, // stack offset method
        order = d3.stackOrderNone, // stack order method
        yFormat, // a format specifier string for the y-axis
        yLabel, // a label for the y-axis
        colors = d3.schemeTableau10, // array of colors
      } = {}) {
        // Compute values.
        const X = d3.map(data, x);
        const Y = d3.map(data, y);
        const Z = d3.map(data, z);
      
        // Compute default x- and z-domains, and unique them.
        if (xDomain === undefined) xDomain = X;
        if (zDomain === undefined) zDomain = Z;
        xDomain = new d3.InternSet(xDomain);
        zDomain = new d3.InternSet(zDomain);
      
        // Omit any data not present in the x- and z-domains.
        const I = d3.range(X.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));
      
        // Compute a nested array of series where each series is [[y1, y2], [y1, y2],
        // [y1, y2], …] representing the y-extent of each stacked rect. In addition,
        // each tuple has an i (index) property so that we can refer back to the
        // original data point (data[i]). This code assumes that there is only one
        // data point for a given unique x- and z-value.
        const series = d3.stack()
            .keys(zDomain)
            .value(([x, I], z) => Y[I.get(z)])
            .order(order)
            .offset(offset)
          (d3.rollup(I, ([i]) => i, i => X[i], i => Z[i]))
          .map(s => s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})));
      
        // Compute the default y-domain. Note: diverging stacks can be negative.
        if (yDomain === undefined) yDomain = d3.extent(series.flat(2));
      
        // Construct scales, axes, and formats.
        const xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
        const yScale = yType(yDomain, yRange);
        const color = d3.scaleOrdinal(zDomain, colors);
        const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);
      
        // Compute titles.
        if (title === undefined) {
          const formatValue = yScale.tickFormat(100, yFormat);
          title = i => `${X[i]}\n${Z[i]}\n${formatValue(Y[i])}`;
        } else {
          const O = d3.map(data, d => d);
          const T = title;
          title = i => T(O[i], i, data);
        }
      
        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
      
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(yAxis)
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
                .attr("x", -marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text(yLabel));
      
        const bar = svg.append("g")
          .selectAll("g")
          .data(series)
          .join("g")
            .attr("fill", ([{i}]) => color(Z[i]))
          .selectAll("rect")
          .data(d => d)
          .join("rect")
            .attr("x", ({i}) => xScale(X[i]))
            .attr("y", ([y1, y2]) => Math.min(yScale(y1), yScale(y2)))
            .attr("height", ([y1, y2]) => Math.abs(yScale(y1) - yScale(y2)))
            .attr("width", xScale.bandwidth());
      
        if (title) bar.append("title")
            .text(({i}) => title(i));
      
        svg.append("g")
            .attr("transform", `translate(0,${yScale(0)})`)
            .call(xAxis);
      
        return Object.assign(svg.node(), {scales: {color}});
      }

    // Always start by console.logging the data
    console.log(data);

    // Create a new object to transform data
    
    let newData = [
        { race: "Asian", gender: "Male", count: 0 },
        { race: "Asian", gender: "Female", count: 0 },
        { race: "Asian", gender: "", count: 0 },
        { race: "Black", gender: "Male", count: 0 },
        { race: "Black", gender: "Female", count: 0 },
        { race: "Black", gender: "", count: 0 },
        { race: "Hispanic", gender: "Male", count: 0 },
        { race: "Hispanic", gender: "Female", count: 0 },
        { race: "Hispanic", gender: "", count: 0 },
        { race: "Native", gender: "Male", count: 0 },
        { race: "Native", gender: "Female", count: 0 },
        { race: "Native", gender: "", count: 0 },
        { race: "White", gender: "Male", count: 0 },
        { race: "White", gender: "Female", count: 0 },
        { race: "White", gender: "", count: 0 },
        { race: "Other", gender: "Male", count: 0 },
        { race: "Other", gender: "Female", count: 0 },
        { race: "Other", gender: "", count: 0 },
        { race: "", gender: "Male", count: 0 },
        { race: "", gender: "Female", count: 0 },
        { race: "", gender: "", count: 0 },

    ];

    for(var d of data) {
         let nd = newData.find(nd => (nd.race == d["Race"] && nd.gender == d["Gender"]) );
         nd.count += 1;
    }

    console.log(newData)

    let genders = ["Male", "Female", ""];
    let races = ["Black", "Hispanic", "Native", "White", ""];

    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let chart = StackedBarChart(newData, {
        x: d => d.race,
        y: d => d.count,
        z: d => d.gender,
        xDomain: races, // d3.groupSort(newData, D => d3.sum(D, d => -d.count), d => d.race),
        yLabel: "Count",
        zDomain: genders,
        colors: d3.schemeSpectral[genders.length],
        width,
        height: 500
    })


    let svg = d3.select("#chart")
        .append("svg")
        .append("chart")
        .attr("viewBox", [0, 0, width, height]); 
    
    let x = d3.scaleBand()
        .domain(newData.map(d => d.race)) // Use array from line 8 (newData) and Gender from newData
        .range([margin.left, width - margin.right]) 
        .padding(0.1);
    
    let y = d3.scaleLinear()
        .domain([0, d3.max(newData, d => d.count)]).nice() // uses newData as data and Totals from newData
        .range([height - margin.bottom, margin.top]); 
    
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));
    
});