// set the dimensions and margins of the graph
var bar_margin = { top: 10, right: 100, bottom: 10, left: 50 },
    bar_width = d3.select("#bar_block").node().getBoundingClientRect().width - bar_margin.left - bar_margin.right,
    bar_height = d3.select("#bar_block").node().getBoundingClientRect().height - bar_margin.top - bar_margin.bottom;

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
    .range([0, bar_width])


var bar_yAxis = bar_svg.append("g")
    .attr("class", "myYaxis")

bar_yAxis.call(d3.axisLeft(bar_y))


// A function that create / update the plot for a given variable:
function bar_update(data) {
    data.sort(function(b, a) {
        return a.value - b.value;
    });

    var arr = []
    data.forEach(function(d) {
        arr.push(+d.value)
    })

    function domainRes(arr) {
        if (d3.min(arr) > 0) {
            // console.log(d3.min(arr))
            return [0, d3.max(arr)]
        } else {
            return [d3.min(arr), d3.max(arr)]
        }
    }

    domainResult = domainRes(arr)
    console.log(domainResult)


    console.log(data)

    // Update the X axis
    bar_y
        .domain(data.map(function(d) {
            return d.country;
        }))

    bar_yAxis.call(d3.axisLeft(bar_y))


    // Update the Y axis
    bar_x.domain(domainResult)
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
        // .attr("x", 0)
        .attr("x", function(d) {
            // console.log(bar_x(Math.min(0, d.value)))
            return bar_x(Math.min(0, d.value));
        })
        .attr("y", function(d) { return bar_y(d.country); })
        .attr("height", bar_y.bandwidth())
        // .attr("width", function(d) { return bar_x(d.value); })
        .attr("width", function(d) { return Math.abs(bar_x(d.value) - bar_x(0)); })
        .attr("fill", "#88cc33")



    // If less group in the new dataset, I delete the ones not in use anymore

    bar_u

        .exit()

    .remove()



    var labels = bar_svg.selectAll(".label")
        .data(data)

    // console.log(labels)
    var f = d3.format(".2s")
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
        .text(function(d) { return f(+d.value) });

    labels
        .exit()
        .remove()


}

// Initialize the plot with the first dataset
bar_update()