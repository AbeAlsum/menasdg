// set the dimensions and margins of the graph
var bar_margin = { top: 30, right: 30, bottom: 70, left: 60 },
    bar_width = 460 - bar_margin.left - bar_margin.right,
    bar_height = 400 - bar_margin.top - bar_margin.bottom;

// append the svg object to the body of the page
var bar_svg = d3.select("#bar_block")
    .append("svg")
    .attr("width", bar_width + bar_margin.left + bar_margin.right)
    .attr("height", bar_height + bar_margin.top + bar_margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + bar_margin.left + "," + bar_margin.top + ")");

// Initialize the X axis
var bar_x = d3.scaleBand()
    .range([0, bar_width])
    .padding(0.2);

var bar_xAxis = bar_svg.append("g")
    .attr("transform", "translate(0," + bar_height + ")")

// Initialize the Y axis
var bar_y = d3.scaleLinear()
    .range([bar_height, 0]);

var bar_yAxis = bar_svg.append("g")
    .attr("class", "myYaxis")


// A function that create / update the plot for a given variable:
function bar_update(data) {
    // console.log(data)

    // Update the X axis
    bar_x.domain(data.map(function(d) {
        return d.country;
    }))
    bar_xAxis.call(d3.axisBottom(bar_x))

    // Update the Y axis
    bar_y.domain([0, d3.max(data, function(d) { return +d.value })]);
    bar_yAxis.transition().duration(1).call(d3.axisLeft(bar_y));

    // Create the u variable
    var bar_u = bar_svg.selectAll("rect")
        .data(data)

    bar_u
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(bar_u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1)
        .attr("x", function(d) { return bar_x(d.country); })
        .attr("y", function(d) { return bar_y(d.value); })
        .attr("width", bar_x.bandwidth())
        .attr("height", function(d) { return bar_height - bar_y(d.value); })
        .attr("fill", "#69b3a2")

    // If less group in the new dataset, I delete the ones not in use anymore
    bar_u
        .exit()
        .remove()
}

// Initialize the plot with the first dataset
bar_update()