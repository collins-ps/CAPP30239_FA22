// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/stacked-bar-chart

d3.json("a3cleanedonly2015.json").then(data => {

    let newData = [
        { state: 'AL', count: 0, armed: "" },
        { state: 'AK', count: 0, armed: ""  },
        { state: 'AS', count: 0, armed: ""  },
        { state: 'AZ', count: 0, armed: ""  },
        { state: 'AR', count: 0, armed: ""  },
        { state: 'CA', count: 0, armed: ""  },
        { state: 'CO', count: 0, armed: ""  },
        { state: 'CT', count: 0, armed: ""  },
        { state: 'DE',count: 0, armed: ""  },
        { state: 'DC', count: 0, armed: ""  }, 
        { state: 'FM', count: 0, armed: ""  },
        { state: 'FL',count: 0, armed: ""  },
        { state: 'GA',count: 0, armed: ""  },
        { state: 'GU', count: 0, armed: ""  },
        { state: 'HI',count: 0, armed: ""  },
        { state: 'ID', count: 0, armed: ""  },
        { state: 'IL', count: 0, armed: ""  },
        { state: 'IN', count: 0, armed: ""  },
        { state: 'IA', count: 0, armed: ""  },
        { state: 'KS', count: 0, armed: ""  },
        { state: 'KY', count: 0, armed: ""  },
        { state: 'LA', count: 0, armed: ""  },
        { state: 'ME', count: 0, armed: ""  },
        { state: 'MH', count: 0, armed: ""  },
        { state: 'MD', count: 0, armed: ""  },
        { state: 'MA', count: 0, armed: ""  },
        { state: 'MI', count: 0, armed: ""  },
        { state: 'MN', count: 0, armed: ""  },
        { state: 'MS', count: 0, armed: ""  },
        { state: 'MO', count: 0, armed: ""  },
        { state: 'MT', count: 0, armed: ""  },
        { state: 'NE', count: 0, armed: ""  },
        { state: 'NV', count: 0, armed: ""  },
        { state: 'NH', count: 0, armed: ""  },
        { state: 'NJ', count: 0, armed: ""  },
        { state: 'NM', count: 0, armed: ""  },
        { state: 'NY', count: 0, armed: ""  },
        { state: 'NC', count: 0, armed: ""  },
        { state: 'ND', count: 0, armed: ""  },
        { state: 'MP', count: 0, armed: ""  },
        { state: 'OH', count: 0, armed: ""  },
        { state: 'OK', count: 0, armed: ""  },
        { state: 'OR', count: 0, armed: ""  },
        { state: 'PW', count: 0, armed: ""  },
        { state: 'PA', count: 0, armed: ""  },
        { state: 'PR', count: 0, armed: ""  },
        { state: 'RI', count: 0, armed: ""  },
        { state: 'SC', count: 0, armed: ""  },
        { state: 'SD', count: 0, armed: ""  },
        { state: 'TN', count: 0, armed: ""  },
        { state: 'TX', count: 0, armed: ""  },
        { state: 'UT', count: 0, armed: ""  },
        { state: 'VT', count: 0, armed: ""  },
        { state: 'VI', count: 0, armed: ""  },
        { state: 'VA', count: 0, armed: ""  },
        { state: 'WA', count: 0, armed: ""  },
        { state: 'WV', count: 0, armed: ""  },
        { state: 'WI', count: 0, armed: ""  },
        { state: 'WY', count: 0, armed: ""  },
        { state: 'AL', count: 0, armed: "Armed" },
        { state: 'AK', count: 0, armed: "Armed"  },
        { state: 'AS', count: 0, armed: "Armed"  },
        { state: 'AZ', count: 0, armed: "Armed"  },
        { state: 'AR', count: 0, armed: "Armed"  },
        { state: 'CA', count: 0, armed: "Armed"  },
        { state: 'CO', count: 0, armed: "Armed"  },
        { state: 'CT', count: 0, armed: "Armed"  },
        { state: 'DE',count: 0, armed: "Armed"  },
        { state: 'DC', count: 0, armed: "Armed"  }, 
        { state: 'FM', count: 0, armed: "Armed"  },
        { state: 'FL',count: 0, armed: "Armed"  },
        { state: 'GA',count: 0, armed: "Armed"  },
        { state: 'GU', count: 0, armed: "Armed"  },
        { state: 'HI',count: 0, armed: "Armed"  },
        { state: 'ID', count: 0, armed: "Armed"  },
        { state: 'IL', count: 0, armed: "Armed"  },
        { state: 'IN', count: 0, armed: "Armed"  },
        { state: 'IA', count: 0, armed: "Armed"  },
        { state: 'KS', count: 0, armed: "Armed"  },
        { state: 'KY', count: 0, armed: "Armed"  },
        { state: 'LA', count: 0, armed: "Armed"  },
        { state: 'ME', count: 0, armed: "Armed"  },
        { state: 'MH', count: 0, armed: "Armed"  },
        { state: 'MD', count: 0, armed: "Armed"  },
        { state: 'MA', count: 0, armed: "Armed"  },
        { state: 'MI', count: 0, armed: "Armed"  },
        { state: 'MN', count: 0, armed: "Armed"  },
        { state: 'MS', count: 0, armed: "Armed"  },
        { state: 'MO', count: 0, armed: "Armed"  },
        { state: 'MT', count: 0, armed: "Armed"  },
        { state: 'NE', count: 0, armed: "Armed"  },
        { state: 'NV', count: 0, armed: "Armed"  },
        { state: 'NH', count: 0, armed: "Armed"  },
        { state: 'NJ', count: 0, armed: "Armed"  },
        { state: 'NM', count: 0, armed: "Armed"  },
        { state: 'NY', count: 0, armed: "Armed"  },
        { state: 'NC', count: 0, armed: "Armed"  },
        { state: 'ND', count: 0, armed: "Armed"  },
        { state: 'MP', count: 0, armed: "Armed"  },
        { state: 'OH', count: 0, armed: "Armed"  },
        { state: 'OK', count: 0, armed: "Armed"  },
        { state: 'OR', count: 0, armed: "Armed"  },
        { state: 'PW', count: 0, armed: "Armed"  },
        { state: 'PA', count: 0, armed: "Armed"  },
        { state: 'PR', count: 0, armed: "Armed"  },
        { state: 'RI', count: 0, armed: "Armed"  },
        { state: 'SC', count: 0, armed: "Armed"  },
        { state: 'SD', count: 0, armed: "Armed"  },
        { state: 'TN', count: 0, armed: "Armed"  },
        { state: 'TX', count: 0, armed: "Armed"  },
        { state: 'UT', count: 0, armed: "Armed"  },
        { state: 'VT', count: 0, armed: "Armed"  },
        { state: 'VI', count: 0, armed: "Armed"  },
        { state: 'VA', count: 0, armed: "Armed"  },
        { state: 'WA', count: 0, armed: "Armed"  },
        { state: 'WV', count: 0, armed: "Armed"  },
        { state: 'WI', count: 0, armed: "Armed"  },
        { state: 'WY', count: 0, armed: "Armed"  }
    ];

    for(var d of data) {
          let nd = 0;
          if (d["Armed"] == "") {
            nd = newData.find(nd => (nd.state == d["State"] && nd.armed == ""));
          } else {
            nd = newData.find(nd => (nd.state == d["State"] && nd.armed == "Armed"));
          }
         nd.count += 1;
    }

    console.log(newData)

    let armed = ["", "Armed"];
    let states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

  
    let chart = StackedBarChart(newData, {
        x: d => d.state,
        y: d => d.count,
        z: d => d.armed,
        xDomain: states, // d3.groupSort(newData, D => d3.sum(D, d => -d.count), d => d.race),
        yLabel: "↑ Count",
        zDomain: armed,
        colors: d3.schemeSpectral[armed.length],
        width: 1040,
        /*height: 500*/
    })

    document.getElementById("chart").appendChild(chart);

});

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/stacked-bar-chart
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