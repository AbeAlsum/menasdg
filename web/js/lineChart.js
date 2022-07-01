var line_margin = { top: 10, right: 30, bottom: 30, left: 10 },
    line_width = d3.select("#line_block").node().getBoundingClientRect().width - line_margin.left - line_margin.right,
    line_height = 400 - line_margin.top - line_margin.bottom;

var line_svg = d3.select("#line_block")
    .append("svg")
    .attr("width", line_width + line_margin.left + line_margin.right)
    .attr("height", line_height + line_margin.top + line_margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + line_margin.left + "," + line_margin.top + ")");

var line_x = d3.scaleTime()
    .domain(d3.extent(["2000", "2001", "2002", "2003"], function(d) { return d; }))
    .range([0, line_width]);

line_svg.append("g")
    .attr("transform", "translate(0," + line_height + ")")
    .call(d3.axisBottom(line_x).ticks(window.innerWidth / 150));

var line_y = d3.scaleLinear()
    .domain([0, d3.max([0, 100], function(d) { return +d; })])
    .range([line_height, 0]);

line_svg.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(line_y));