// const delay = ms = > {
// return new Promise( r )
// }

async function returnTopo() {
    const response = await fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    const data = await response.json()
    return data
        // return topo
}
// returnTopo()

// topo = returnTopo()
// (async() => {
//     var topo = await returnTopo()
//     console.log(topo)
// })()
// return topo
returnTopo().then(topo => {
    var map_margin = { top: 10, right: 10, bottom: 10, left: 20 },
        map_width = d3.select("#map_block").node().getBoundingClientRect().width - map_margin.left - map_margin.right,
        //height = d3.select("#ierarchy").node().getBoundingClientRect().height - margin.top - margin.bottom;
        map_height = 400
        // The svg
    var map_svg = d3.select("#map_block")
        .append("svg")
        .attr("width", map_width + map_margin.left + map_margin.right)
        .attr("height", map_height + map_margin.top + map_margin.bottom)

    // Map and projection
    var map_path = d3.geoPath();
    var map_projection = d3.geoMercator()
        .scale(70)
        .center([0, 20])
        .translate([map_width / 2, map_height / 2]);

    // Data and color scale
    var map_data = d3.map();
    var map_colorScale = d3.scaleThreshold()
        .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
        .range(d3.schemeBlues[7]);

    map_svg.append("g")
        .selectAll("path")
        .data(topo.features)
        .enter()
        .append("path")
        // draw each country
        .attr("d", d3.geoPath()
            .projection(map_projection)
        )
        // set the color of each country
        .attr("fill", function(d) {
            d.total = 0
            return map_colorScale(d.total);
        })
        .style("stroke", "transparent")
        .attr("class", function(d) { return d.properties.name })
        .style("opacity", .8)
});


// var map_margin = { top: 10, right: 10, bottom: 10, left: 20 },
//     map_width = d3.select("#map_block").node().getBoundingClientRect().width - map_margin.left - map_margin.right,
//     //height = d3.select("#ierarchy").node().getBoundingClientRect().height - margin.top - margin.bottom;
//     map_height = 400
//     // The svg
// var map_svg = d3.select("#map_block")
//     .append("svg")
//     .attr("width", map_width + map_margin.left + map_margin.right)
//     .attr("height", map_height + map_margin.top + map_margin.bottom)

// // Map and projection
// var map_path = d3.geoPath();
// var map_projection = d3.geoMercator()
//     .scale(70)
//     .center([0, 20])
//     .translate([map_width / 2, map_height / 2]);

// // Data and color scale
// var map_data = d3.map();
// var map_colorScale = d3.scaleThreshold()
//     .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
//     .range(d3.schemeBlues[7]);

// map_svg.append("g")
//     .selectAll("path")
//     .data(topo.features)
//     .enter()
//     .append("path")
//     // draw each country
//     .attr("d", d3.geoPath()
//         .projection(map_projection)
//     )
//     // set the color of each country
//     .attr("fill", function(d) {
//         d.total = 0
//         return map_colorScale(d.total);
//     })
//     .style("stroke", "transparent")
//     .attr("class", function(d) { return "Country" })
//     .style("opacity", .8)


function getMap(text) {

    // console.log(text)
    map_svg = d3.select("#map_block")
    var map_colorScale = d3.scaleThreshold()
        .domain([10, 20, 30, 40, 50, 60])
        .range(d3.schemeBlues[7]);

    text.forEach(element => {
        countries = document.getElementsByClassName(element.country)
            // console.log(countries)
        for (let item of countries) {
            // console.log(item.__data__)
            // console.log(item.__data__.total)
            // console.log(map_colorScale(item.__data__.total))
            // item.style.fill = 'red'
            item.style.fill = map_colorScale(element.value)
        }
    })

    // // Draw the map
    // map_svg.append("g")
    //     .selectAll("path")
    //     .data(topo.features)
    //     .enter()
    //     .append("path")
    //     // draw each country
    //     .attr("d", d3.geoPath()
    //         .projection(map_projection)
    //     )
    //     // set the color of each country
    //     .attr("fill", function(d) {
    //         text.forEach(element => {
    //             if (d.properties.name == element.country) {
    //                 d.total = text.value
    //                 return map_colorScale(d.total);
    //             } else {
    //                 d.total = 0
    //                 return map_colorScale(d.total);
    //             }
    //         });
    //     })
    //     .style("stroke", "transparent")
    //     .attr("class", function(d) { return d.properties.name })
    //     .style("opacity", .8)

}