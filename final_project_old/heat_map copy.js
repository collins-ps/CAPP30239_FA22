const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv("sg_weather.csv").then(data => {

    console.log(data)

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
    let color_scale = d3.scaleLinear()
        .domain([0, 100])
        .range(['#fff', '#A3320B'])

    let y_scale = d3.scaleBand().domain(d3.range(5)).range([height, 0])

    let x_scale = d3.scaleBand()
    //.domain(['J','F','M','A','M','J','J','A','S','O','N','D'])
    .domain([0,1,2,3,4,5,6,7,8,9,11])
    .range([0, width])
    
    /*const svg = d3.select(DOM.svg(width, height))*/
    const g = svg.attr('width', width - margin.left)
     .attr('height', height + margin.top + margin.bottom)
     .append('g')
     .attr('transform', 'translate(' + margin.left + ', 0)')
    
    g.append('g')
      .attr('transform', 'translate(0,' +  height +')')
      .call(d3.axisBottom(x_scale))
    g.append('g')
      .call(d3.axisLeft(y_scale))
    
    svg.selectAll()
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x_scale(d.Month) + margin.left)
      .attr('y', (d) => y_scale(d.Decade))
      .attr('width', x_scale.bandwidth())
      .attr('height', (d) => 50)
      .attr('fill', (d) => color_scale(d.total_rainfall))

      

});

