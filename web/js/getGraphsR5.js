var line_margin = { top: 50, right: 50, bottom: 50, left: 50 },
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
    .domain(d3.extent([2000, 2010], function(d) {
        date = d3.timeParse("%Y")(d)
        return date;
    }))
    .range([0, line_width])

line_svg.append("g")
    .attr("class", "myXaxis")
    .attr("transform", "translate(0," + line_height + ")")
    .call(d3.axisBottom(line_x).ticks(window.innerWidth / 150))



var line_y = d3.scaleLinear()
    .domain([0, d3.max([0, 100], function(d) { return +d; })])
    .range([line_height, 0]);

line_svg.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(line_y));

function getLineChart(data, countryList, dimentionsDict) {

    var sumstat = d3.nest()
        .key(function(d) {
            //console.log(d.country)
            return d.country;
        })
        .entries(data);

    var res = sumstat.map(function(d) {
        //console.log(d.key)
        return d.key
    })

    var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])

    var testFilter = data.filter(function(d) { return d.country == res[0] });

    //console.log(testFilter)

    var line_group = line_svg.selectAll(".group")
        .data(sumstat)
        .enter()
        .append("g")
        .attr("class", "group");

    var line_x = d3.scaleTime()
        .domain(d3.extent(testFilter, function(d) {
            //console.log(d.year)
            return d.year;
        }))
        .range([0, line_width])

    line_svg.append("g")
        .attr("class", "myXaxis")
        .attr("transform", "translate(0," + line_height + ")")
        .call(d3.axisBottom(line_x).ticks(window.innerWidth / 150))

    var arr = []
    testFilter.forEach(function(d) {
            arr.push(+d.value)
        })
        //console.log(arr)

    var line_y = d3.scaleLinear()
        .domain([0, d3.max(arr)])
        .range([line_height, 0]);

    line_svg.append("g")
        .attr("class", "myYaxis")
        .call(d3.axisLeft(line_y));

    line_svg.selectAll(".myXaxis")
        .transition()
        .duration(500)
        .call(d3.axisTop(line_x));

    var linepath = d3.line()
        .x(function(d) { return line_x(d.year); })
        .y(function(d) { return line_y(d.value); });


    line_group.append("path")
        .attr("class", "line")
        .attr("d", function(d) {
            return linepath(d.values);
        })
        .attr("fill", "none")
        .style("stroke", function(d) {
            return color(d.key);
        });

    function filteredData() {
        var linepath = d3.line()
            .x(function(d) { return line_x(d.year); })
            .y(function(d) { return line_y(d.value); });

        countries = []
        countryList.forEach(function(d) {
            idss = d.geoAreaName.toString()
            cidss = idss.replace(/\s/g, '')
            var cbb = document.querySelector('#' + cidss);
            if (cbb.checked == true) {
                countries.push(cbb.value)
                    //console.log(countries)
            } else {
                countries.filter((n) => { return n != cbb.value.toString() })
            }
        })

        actualParameters = []
        dimentionsDict.forEach(function(d) {
            ids = d.name.toString()
            cids = ids.replace(/\s/g, '')
            actualParameters.push({
                name: d.name,
                value: d3.select('#' + cids).property("value")
            })
        })


        dataFilteredCountry = data.filter(function(e) {
            if (countries.includes(e.geoAreaCode)) { return e } else {}
        })

        dataFiltered = dataFilteredCountry.filter(function(e) {
            selectorOne = []
            selectorTwo = []
            actualParameters.forEach(function(param) {
                for (const [key, value] of Object.entries(e.dimensions)) {
                    if (key == param.name && value == param.value) {
                        selectorOne.push(value)
                        selectorTwo.push(param.value)
                    } else {}
                }
            })
            if (selectorOne.length == actualParameters.length) {
                return e;
            } else {}

        });




        //console.log(dataFiltered)

        var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(function(d) {
                //console.log(d.country)
                return d.country;
            })
            .entries(dataFiltered);

        var arr = []
        dataFiltered.forEach(function(d) {
                arr.push(+d.value)
            })
            //console.log(arr)

        var line_y = d3.scaleLinear()
            .domain([0, d3.max(arr)])
            .range([line_height, 0]);


        var line_x = d3.scaleTime()
            .domain(d3.extent(dataFiltered, function(d) {
                //console.log(d.year)
                return d.year;
            }))
            .range([0, line_width]);


        // line_x.domain([0, d3.max(dataFiltered, function(d) {
        //     return d.year
        // })]);

        line_svg.selectAll(".myYaxis")
            .transition()
            .duration(500)
            .call(d3.axisLeft(line_y))


        line_svg.selectAll(".myXaxis")
            .transition()
            .duration(500)
            .call(d3.axisTop(line_x));


        line_svg.selectAll(".group")
            .remove();

        var line_group = line_svg.selectAll(".group")
            .data(sumstat)
            .enter()
            .append("g")
            .attr("class", "group");


        line_group.append("path")
            .attr("class", "line")
            .transition()
            .duration(500)
            .attr("d", function(d) {
                return linepath(d.values);
            })
            .attr("fill", "none")
            .style("stroke", function(d) {
                return color(d.key);
            });



        var tooltip = d3.select("#line_block")
            .append("div")
            .data(dataFiltered)
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")

        // .html(function() {
        //     selection = document.getElementsByClassName(d3.select(this)._groups[0][0].classList[0])
        //     text = []
        //         // console.log(selection.length)
        //     for (var i = 0; i < selection.length; i++) {
        //         //console.log(selection[i])
        //         // try {
        //         //     console.log(selected._groups[0][i].nodeName)
        //         if (selection[i].nodeName == "circle") {
        //             if (selection[i].style.opacity == 1) {
        //                 console.log(selection[i])
        //             }
        //             text.push({
        //                 country: selected._groups[0][i].__data__.country,
        //                 value: selected._groups[0][i].__data__.value,
        //                 year: selected._groups[0][i].__data__.year.getFullYear()
        //             })
        //         } else {}
        //         // } catch {}
        //     }
        //     return text
        // })


        var mouseover = function(d) {
            selected = d3.selectAll(".cl" + d.year.getFullYear())
                // console.log(d3.select(this)._groups[0][0].classList[0])
            selection = document.getElementsByClassName(d3.select(this)._groups[0][0].classList[0])
                // selected = d3.selectAll("." + d3.select(this)._groups[0][0].classList[0])
                //     // console.log(selected._groups[0])
                // text = []
                //     // console.log(selection.length)
                // for (var i = 0; i < selection.length; i++) {
                //     //console.log(selection[i])
                //     // try {
                //     //     console.log(selected._groups[0][i].nodeName)
                //     if (selection[i].nodeName == "circle") {
                //         text.push({
                //             country: selected._groups[0][i].__data__.country,
                //             value: selected._groups[0][i].__data__.value,
                //             year: selected._groups[0][i].__data__.year.getFullYear()
                //         })
                //     } else {}
                //     // } catch {}
                // }
                // console.log(text)

            selected
                .style("opacity", 1)

            tooltip
                .style("opacity", 1)
                // .html(
                //     JSON.stringify(text)
                // )

        }



        var mousemove = function(d) {
            selected = d3.selectAll(".cl" + d.year.getFullYear())

            // selection = document.getElementsByClassName(d3.select(this)._groups[0][0].classList[0])
            //     // selected = d3.selectAll("." + d3.select(this)._groups[0][0].classList[0])
            //     //     // console.log(selected._groups[0])
            // text = []
            //     // console.log(selection.length)
            // for (var i = 0; i < selection.length; i++) {
            //     //console.log(selection[i])
            //     // try {
            //     //     console.log(selected._groups[0][i].nodeName)
            //     if (selection[i].nodeName == "circle") {
            //         if (selection[i].style.opacity == 1) {
            //             console.log(selection[i])
            //         }
            //         text.push({
            //             country: selected._groups[0][i].__data__.country,
            //             value: selected._groups[0][i].__data__.value,
            //             year: selected._groups[0][i].__data__.year.getFullYear()
            //         })
            //     } else {}
            //     // } catch {}
            //}

            selected
                .attr("r", 10)
                .style("fill", "red")
                .style("stroke", "red")
                .style("opacity", 1)


            tooltip
            // .html(JSON.stringify(text))
                .style("opacity", 1)
                //.html()
                // d.value + " " + d.year.getFullYear())
                .style("left", (d3.mouse(this)[0] + 90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("top", (d3.mouse(this)[1]) + "px")
                .html(function() {
                    selection = document.getElementsByClassName(d3.select(".cl" + d.year.getFullYear())._groups[0][0].classList[0])
                    text = []
                        // console.log(selection.length)
                    for (var i = 0; i < selection.length; i++) {
                        //console.log(selection[i])
                        // try {
                        //     console.log(selected._groups[0][i].nodeName)
                        if (selection[i].nodeName == "circle") {
                            if (selection[i].style.opacity == 1) {
                                console.log(selection[i])
                            }
                            text.push({
                                country: selected._groups[0][i].__data__.country,
                                value: selected._groups[0][i].__data__.value,
                                year: selected._groups[0][i].__data__.year.getFullYear()
                            })
                        } else {}
                        // } catch {}
                    }
                    return JSON.stringify(text)
                })
        }



        // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
        var mouseleave = function(d) {
            selected = d3.selectAll(".cl" + d.year.getFullYear())
                .style("opacity", 0)

            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0)
        }

        var circles = line_svg.append('g')
            .selectAll("dot")
            .data(dataFiltered)
            .enter()
            .append("circle")
            .attr("class", function(d) { return "cl" + d.year.getFullYear().toString() })
            .attr("cx", function(d) { return line_x(d.year); })
            .attr("cy", function(d) { return line_y(d.value); })
            .attr("r", 3)
            .style("fill", "#69b3a2")
            .style("opacity", 0)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

        var vLines = line_svg.append('g')
            .selectAll("path")
            .data(dataFiltered)
            .enter()
            .append("path")
            .attr("class", function(d) { return "cl" + d.year.getFullYear().toString() })
            .attr("d", function(d) {
                var data = "M" + line_x(d.year) + "," + (line_height);
                data += " " + line_x(d.year) + "," + 0;
                return data; // line
            })
            .style("stroke", "red")
            .style("opacity", 0)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)





        // This allows to find the closest X index of the mouse:
        //     var lineStroke = "2px"



        //     tooltip = d3.select("#line_block").append("div")
        //         .attr('id', 'tooltip')
        //         .style('position', 'absolute')
        //         .style("background-color", "#D3D3D3")
        //         .style('padding', 6)
        //         .style('display', 'none')

        //     mouseG = line_svg.append("g")
        //         .attr("class", "mouse-over-effects");

        //     mouseG.append("path") // create vertical line to follow mouse
        //         .attr("class", "mouse-line")
        //         .style("stroke", "#A9A9A9")
        //         .style("stroke-width", lineStroke)
        //         .style("opacity", "0");

        //     var mousePerLine = mouseG.selectAll('.mouse-per-line')
        //         .data(dataFiltered)
        //         .enter()
        //         .append("g")
        //         .attr("class", "mouse-per-line");

        //     mousePerLine.append("circle")
        //         .attr("r", 4)
        //         .style("stroke", function(d) {
        //             return color(d.key)
        //         })
        //         .style("fill", "none")
        //         .style("stroke-width", lineStroke)
        //         .style("opacity", "0");

        //     mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
        //         .attr('width', line_width)
        //         .attr('height', line_height)
        //         .attr('fill', 'none')
        //         .attr('pointer-events', 'all')
        //         .on('mouseout', function() { // on mouse out hide line, circles and text
        //             d3.select(".mouse-line")
        //                 .style("opacity", "0");
        //             d3.selectAll(".mouse-per-line circle")
        //                 .style("opacity", "0");
        //             d3.selectAll(".mouse-per-line text")
        //                 .style("opacity", "0");
        //             d3.selectAll("#tooltip")
        //                 .style('display', 'none')

        //         })
        //         .on('mouseover', function() { // on mouse in show line, circles and text
        //             d3.select(".mouse-line")
        //                 .style("opacity", "1");
        //             d3.selectAll(".mouse-per-line circle")
        //                 .style("opacity", "1");
        //             d3.selectAll("#tooltip")
        //                 .style('display', 'block')
        //         })
        //         .on('mousemove', function() { // update tooltip content, line, circles and text when mouse moves
        //             var mouse = d3.mouse(this)

        //             d3.selectAll(".mouse-per-line") //circles
        //                 .attr("transform", function(d, i) {
        //                     var xDate = line_x.invert(mouse[0])
        //                     var bisect = d3.bisector(function(d) { return d.year; }).left
        //                     var idx = bisect(dataFiltered, xDate);

        //                     d3.select(".mouse-line")
        //                         .attr("d", function() {
        //                             var data = "M" + line_x(dataFiltered[idx].year) + "," + (line_height);
        //                             data += " " + line_x(dataFiltered[idx].year) + "," + 0;
        //                             return data; // line
        //                         });
        //                     return "translate(" + line_x(dataFiltered[idx].year) + "," + line_y(dataFiltered[idx].value) + ")"; //circles

        //                 });

        //             updateTooltipContent(mouse, dataFiltered)

        //         })

        // }

        // function updateTooltipContent(mouse, dataFiltered) {

        //     sortingObj = []
        //     dataFiltered.map(d => {
        //         var xDate = line_x.invert(mouse[0])
        //         var bisect = d3.bisector(function(d) { return d.year; }).left
        //         var idx = bisect(dataFiltered, xDate)
        //         sortingObj.push({ key: dataFiltered[idx].country, premium: dataFiltered[idx].value, year: dataFiltered[idx].year.getFullYear() })
        //     })

        //     console.log(sortingObj)

        //     sortingObj.sort(function(d) {
        //         return d3.descending(d);
        //     })

        //     var sortingArr = sortingObj.map(d => d.key)

        //     var dataFiltered1 = dataFiltered.slice().sort(function(a, b) {
        //         return sortingArr.indexOf(a.key) - sortingArr.indexOf(b.key) // rank vehicle category based on price of premium
        //     })

        //     tooltip.html(sortingObj[0].year)
        //         .style('display', 'block')
        //         .style('left', d3.event.pageX + 20)
        //         .style('top', d3.event.pageY - 20)
        //         .style('font-size', 11.5)
        //         .selectAll()
        //         .data(dataFiltered1).enter() // for each vehicle category, list out name and price of premium
        //         .append('div')
        //         .style('color', d => {
        //             return color(d.key)
        //         })
        //         .style('font-size', 10)
        //         .html(d => {
        //             var xDate = line_x.invert(mouse[0])
        //             var bisect = d3.bisector(function(d) { return d.year; }).left
        //             var idx = bisect(dataFiltered, xDate)
        //             return d.country + "   " + dataFiltered[idx].value
        //         })

    }
    filteredData()

    dimentionsDict.forEach(function(d) {
        ids = d.name.toString()
        cids = ids.replace(/\s/g, '')
        var cb = document.querySelector('#' + cids);
        cb.addEventListener('click', (event) => {
            filteredData()
        })
    })

    countryList.forEach(function(d) {
        //console.log(d)
        ids = d.geoAreaName.toString()
        cids = ids.replace(/\s/g, '')
        var cb = document.querySelector('#' + cids);
        cb.addEventListener('click', (event) => {
            filteredData()
        })
    })
}