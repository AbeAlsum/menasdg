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
var bar_y = d3.scaleBand()
    .range([0, bar_height])
    .padding(0.2);

var bar_xAxis = bar_svg.append("g")
    .attr("transform", "translate(0," + bar_height + ")")

// Initialize the Y axis
var bar_x = d3.scaleLinear()
    .range([0, bar_width]);

var bar_yAxis = bar_svg.append("g")
    .attr("class", "myYaxis")


// A function that create / update the plot for a given variable:
function bar_update(data) {
    data.sort(function(b, a) {
        return a.value - b.value;
    });


    // console.log(data)

    // Update the X axis
    bar_y.domain(data.map(function(d) {
        return d.country;
    }))
    bar_yAxis.call(d3.axisLeft(bar_y))

    // Update the Y axis
    bar_x.domain([0, d3.max(data, function(d) { return +d.value })]);
    bar_xAxis.transition().duration(1).call(d3.axisBottom(bar_x));

    bar_xAxis.attr('class', 'bottomAxis')

    // console.log(bar_xAxis)


    // Create the u variable
    var bar_u = bar_svg.selectAll("rect")
        .data(data)

    bar_u
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(bar_u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1)
        .attr("x", 0)
        .attr("y", function(d) { return bar_y(d.country); })
        .attr("height", bar_y.bandwidth())
        .attr("width", function(d) { return bar_x(d.value); })
        .attr("fill", "#69b3a2")

    // If less group in the new dataset, I delete the ones not in use anymore
    bar_u
        .exit()
        .remove()

    var labels = bar_svg.selectAll(".label")
        .data(data)

    // console.log(labels)

    labels
        .enter()
        .append("text")
        .attr("class", "label")
        .merge(labels)
        .attr("y", function(d) { return bar_y(d.country); })
        .transition() // and apply changes to all of them
        .duration(10)
        .attr("x", (function(d) { return bar_x(d.value); }))
        .attr("y", function(d) { return bar_y(d.country) + (bar_y.bandwidth() / 2) + 3; })
        .attr("dy", ".75em")
        .text(function(d) { return d.value; });

    labels
        .exit()
        .remove()


}

// Initialize the plot with the first dataset
bar_update()