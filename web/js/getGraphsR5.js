var line_margin = { top: 10, right: 30, bottom: 40, left: 30 },
    line_width = d3.select("#line_block").node().getBoundingClientRect().width - line_margin.left - line_margin.right,
    line_height = d3.select("#line_block").node().getBoundingClientRect().height - line_margin.top - line_margin.bottom;

var line_svg = d3.select("#line_block")
    .append("svg")
    .attr("width", line_width + line_margin.left + line_margin.right)
    .attr("height", line_height + line_margin.top + line_margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + line_margin.left + "," + line_margin.top + ")");


year_now = new Date().getFullYear()
year_now = +year_now

var line_x = d3.scaleBand()
    .domain(d3.extent([2000, year_now], function(d) {
        date = d3.timeParse("%Y")(d)
        return date.getFullYear();
    }))
    .range([0, line_width])

line_svg.append("g")
    .attr("class", "myXaxis")
    .attr("transform", "translate(0," + line_height + ")")
    .call(d3.axisBottom(line_x).ticks(window.innerWidth / 150))



var line_y = d3.scaleLinear()
    .domain([0, d3.max([0, 100], function(d) { return +d; })])
    .range([line_height, 0]);

line_y_axis = line_svg.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(line_y));

var f = d3.format(".2s")


explainer = line_svg.append('text')

explainer
    .text('Hover mouse on the line to the diving in the data ')
    .attr("x", "0")
    .attr("y", 10)
    .style('font', '14px "serifRegular"')
    .style('color', '#444444')

// line_y_axis.tickFormat(function(d) { return (f(d)) });



function getLineChart(data, countryList) {

    var sumstat = d3.nest()
        .key(function(d) {
            return d.country;
        })
        .entries(data);

    var res = sumstat.map(function(d) {
        return d.key
    })

    var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c', "#BE6E61", '#377eb8', "#BEB461", "#6179BE", '#4daf4a', '#984ea3', "#B861BE", '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999', "#a6cee3",
            "#1f78b4",
            "#b2df8a",
            "#33a02c",
            "#7361BE",
            "#fb9a99",
            '#2CA568',
            '#30A868',
            '#34AA67',
            '#38AD67',
            "#e31a1c",
            "#fdbf6f",
            "#ff7f00",
            "#cab2d6",
            "#6a3d9a",
            "#BE619A",
            "#ffff99",
            "#b15928",
            '#094F68'
        ])
        // .range([
        //     "#61BE93",
        //     "#61BE85",
        //     "#61BEA1",
        //     "#61BE77",
        //     "#61BEAF",
        //     "#61BE69",

    //     "#61BEBD",
    //     "#67BE61",
    //     "#61B1BE",
    //     "#61A3BE",
    //     "#75BE61",
    //     "#83BE61",
    //     "#6195BE",
    //     "#6187BE",

    //     "#91BE61",
    //     "#9FBE61",
    //     "#616BBE",
    //     "#6561BE",
    //     "#ADBE61",
    //     "#BBBE61",

    //     "#8061BE",
    //     "#8E61BE",
    //     "#9C61BE",
    //     "#AA61BE",

    //     "#BE61B6",
    //     "#BE61A8",
    //     "#BE619A",
    //     "#BE618C",
    //     "#BE617E",
    //     "#BE6170",
    //     "#BE6162",

    //     "#BE7C61",
    //     "#BE8A61",
    //     "#BE9861",
    //     "#BEA661"

    // ])



    // .range([
    //     '#053156',
    //     '#063559',
    //     '#063A5D',
    //     '#073F60',
    //     '#084463',
    //     '#084A65',
    //     
    //     '#0A556B',
    //     '#0B5A6E',
    //     '#0C6071',
    //     '#0C6674',
    //     '#0D6C76',
    //     '#0E7279',
    //     '#0F787C',
    //     '#107F7E',
    //     '#11817D',
    //     '#12847C',
    //     '#13867B',
    //     '#148979',
    //     '#168C78',
    //     '#178E76',
    //     '#189074',
    //     '#199372',
    //     '#1A9570',
    //     '#1C986E',
    //     '#1D9A6C',
    //     '#219D6B',
    //     '#25A06A',
    //     '#28A269',
    //     '
    //     '#3CAF66',
    //     '#40B266',
    //     '#44B466',
    //     '#48B766',
    //     '#4CB966',
    //     '#51BC66',
    //     '#55BE66',
    //     '#59C067',
    //     '#5DC367',
    //     '#61C568',
    //     '#66C769',
    //     '#6AC96A',
    //     '#72CB6E',
    //     '#79CE73',
    //     '#80D077',
    //     '#87D27C',
    //     '#8ED480',
    //     '#95D685'
    // ])

    // .range(['#88cc33',
    //     '#8BCD37',
    //     '#8ECE3B',
    //     '#91CF3F',
    //     '#94D043',
    //     '#97D147',
    //     '#9AD24C',
    //     '#9DD350',
    //     '#9FD454',
    //     '#A2D558',
    //     '#A5D65C',
    //     '#A8D760',
    //     '#AAD864',
    //     '#ADD968',
    //     '#B0DA6C',
    //     '#B2DB70',
    //     '#B5DC74',
    //     '#B8DD78',
    //     '#BADE7C',
    //     '#BDDF81',
    //     '#BFE085',
    //     '#C2E189',
    //     '#C4E28D',
    //     '#C7E491',
    //     '#C9E595',
    //     '#CCE699',
    //     '#CEE79D',
    //     '#D0E8A1',
    //     '#D3E9A5',
    //     '#D5EAA9',
    //     '#D7EBAD',
    //     '#D9ECB2',
    //     '#DCEDB6',
    //     '#DEEEBA',
    //     '#E0EFBE',
    //     '#E2F0C2',
    //     '#E4F1C6',
    //     '#E6F2CA',
    //     '#E8F3CE',
    //     '#EAF4D2',
    //     '#ECF5D6'
    // ])



    // 


    var testFilter = data.filter(function(d) { return d.country == res[0] });

    var line_group = line_svg.selectAll(".group")
        .data(sumstat)
        .enter()
        .append("g")
        .attr("class", "group");

    var line_x = d3.scaleBand()
        .domain(d3.extent(testFilter, function(d) {
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

    var line_y = d3.scaleLinear()
        .domain([0, d3.max(arr)])
        .range([line_height, 0]);

    line_y_axis = line_svg.append("g")
        .attr("class", "myYaxis")
        .call(d3.axisLeft(line_y));

    // line_y_axis.tickFormat(function(d) { return (f(d)) });

    line_svg.selectAll(".myXaxis")
        .transition()
        .duration(500)
        .call(d3.axisTop(line_x));

    var linepath = d3.line()
        .x(function(d) {
            return line_x(d.year);
        })
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

    legend_block = document.getElementById('legend_block')

    try {
        while (legend_block.firstChild) {
            legend_block.removeChild(legend_block.lastChild);
        }
    } catch {}

    if (countryList.length >= 32) {
        legend_block.style.cssText = "display: grid; grid-template-columns: repeat(" + Math.round(countryList.length / 4) + ", 1fr); grid-gap: 5px; grid-auto-flow: row; margin-bottom 1vh;"
    } else if (countryList.length >= 15) {
        legend_block.style.cssText = "display: grid; grid-template-columns: repeat(" + Math.round(countryList.length / 2) + ", 1fr); grid-gap: 5px; grid-auto-flow: row; margin-bottom 1vh;"
    } else if (countryList.length >= 10) {
        legend_block.style.cssText = "display: grid; grid-template-columns: repeat(" + Math.round(countryList.length / 2) + ", 1fr); grid-gap: 5px; grid-auto-flow: row; margin-bottom 1vh;"
    } else {
        legend_block.style.cssText = "display: grid; grid-template-columns: repeat(" + countryList.length + ", 1fr); grid-gap: 5px; grid-auto-flow: row; margin-bottom 1vh;"
    }


    countryList.forEach(country => {
        legendElement = document.createElement('div');
        colorSquare = document.createElement('div');
        legendText = document.createElement('p');
        legendText.innerHTML = country.geoAreaName
        colorSquare.style.cssText = "height: 10px; width: 10px; background-color:" + color(country.geoAreaName) + "; height: 12px;"
        legendElement.style.cssText = "display: grid; grid-template-columns: 1fr 95%; align-items: center; height: 12px;"
        legend_block.appendChild(legendElement)
        legendElement.appendChild(colorSquare)
        legendElement.appendChild(legendText)

    })

    function filteredData() {

        // console.log("filteredData()")

        var circles = line_svg.selectAll("circle")

        circles
            .remove()

        var linepath = d3.line()
            .x(function(d) {
                return line_x(d.year);
            })
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

        var select = document.getElementById('dimention_block');
        var selectedOption = select.options[select.selectedIndex].text;
        console.log(selectedOption)
        listOfValues = selectedOption.split(', ')
        actualParameters = []
        listOfValues.forEach(elem => {
            par = elem.split(":")
            actualParameters.push({
                name: par[0].trim(),
                value: par[1].trim()
            })
        })

        // console.log(actualParameters)



        dataFilteredCountry = data.filter(function(e) {
            if (countries.includes(e.geoAreaCode) && e.value != "NaN") { return e } else {}
        })

        dataFiltered = dataFilteredCountry.filter(function(e) {
            selectorOne = []
            selectorTwo = []
            actualParameters.forEach(function(param) {
                for (const [key, value] of Object.entries(e.dimensions)) {
                    // console.log(key + ": " + value)
                    if (key == param.name && value == param.value) {
                        // console.log(key + ", " +
                        //     param.name + ": " + value + ", " + param.value)
                        selectorOne.push(value)
                        selectorTwo.push(param.value)
                    } else {}
                }
            })
            if (selectorOne.length == actualParameters.length) {
                return e;
            } else {}

        });

        console.log(dataFiltered)

        var unique_years = []

        dataFiltered.forEach((d) => {
            // console.log(d.year)
            if (unique_years.includes(d.year)) {

            } else { unique_years.push(d.year) }
        })

        console.log(unique_years.sort())

        var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(function(d) {
                return d.country;
            })
            .entries(dataFiltered);

        var arr = []
        dataFiltered.forEach(function(d) {
            arr.push(+d.value)
        })

        // console.log(d3.min(arr))
        // console.log(d3.max(arr))

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

        // var color = d3.scaleOrdinal()
        //     .domain(sumstat)
        //     .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999', "#a6cee3",
        //         "#1f78b4",
        //         "#b2df8a",
        //         "#33a02c",
        //         "#fb9a99",
        //         "#e31a1c",
        //         "#fdbf6f",
        //         "#ff7f00",
        //         "#cab2d6",
        //         "#6a3d9a",
        //         "#ffff99",
        //         "#b15928"
        //     ])

        var line_y = d3.scaleLinear()
            .domain(domainResult)
            .range([line_height, 0]);


        var line_x = d3.scaleBand()
            .domain(unique_years.sort(d3.ascending))
            .range([0, line_width]);

        var LineyAxis = d3.axisLeft(line_y)

        line_y_axis = line_svg.selectAll(".myYaxis")
            .transition()
            .duration(500)
            .call(LineyAxis)

        line_y_axis
            .selectAll("text")
            .style('font', '12px "serifRegular"')
            .style('color', '#444444')
            .text(function(d) {
                if (d < 1.0) {
                    return d
                } else {
                    return f(+d)
                }

            })

        // console.log(f(10000000))

        LineyAxis.tickFormat(function(d) {
            console.log(d)
            return f(d)
        });


        lineXaxis = line_svg.selectAll(".myXaxis")
            .transition()
            .duration(500)
            .call(d3.axisBottom(line_x));

        lineXaxis
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-80)")
            .style('font', '12px "serifRegular"')
            .style('color', '#444444')


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
            })
            .style("stroke-width", "2px")



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
            .style("font", "14px 'sansBold'")
            .style("color", "#444444")



        var mouseover = function(d) {
            vLines
                .style("opacity", 0)

            text = []

            // tooltip
            //     .style("opacity", 1)
            //     .style("left", (d3.mouse(this)[0] + 100) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            //     .style("top", (d3.mouse(this)[1]) + "px")
            //     .html(function() {
            //         var selected = d3.selectAll(".cl" + d)
            //         selected._groups.forEach(nodeList => {
            //             nodeList.forEach(d => {
            //                 if (d.nodeName == "circle") {
            //                     text.push({
            //                         country: d.__data__.country,
            //                         value: d.__data__.value,
            //                         year: d.__data__.year
            //                     })
            //                 } else {}
            //             })
            //         })
            //         bar_update(text)
            //         getMap(text)
            //         return JSON.stringify(text)
            //     })
        }

        var mousemove = function(d) {

            vLines
                .style("opacity", 0)

            text = []
            barData = []

            tooltip
                .style("opacity", 1)
                .style("left", (d3.mouse(this)[0] + 100) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("top", (d3.mouse(this)[1]) + "px")
                .html(function() {
                    var yearPlaceholder = document.getElementById('yearPlaceholder')
                    try {
                        while (yearPlaceholder.firstChild) {
                            yearPlaceholder.removeChild(yearPlaceholder.lastChild);
                        }
                    } catch {}
                    series =
                        year = document.createElement('h3');
                    year.innerHTML = "Year: " + d
                    yearPlaceholder.appendChild(year)

                    var selected = d3.selectAll(".cl" + d)
                    selected._groups.forEach(nodeList => {
                        nodeList.forEach(d => {
                            // for (var i = 0; i < selected.length; i++) {
                            // console.log(d)
                            if (d.nodeName == "circle") {
                                // console.log(d)
                                barData.push({
                                    country: d.__data__.country,
                                    value: d.__data__.value,
                                    year: d.__data__.year
                                })

                                if (d.__data__.value < 1.0) {
                                    var val = +d.__data__.value
                                } else {
                                    var val = f(+d.__data__.value)
                                }

                                text.push({
                                    country: d.__data__.country,
                                    value: val,
                                    year: d.__data__.year
                                })
                            } else {}
                        })
                    })
                    bar_update(barData)
                        // console.log(barData)
                    getMap(barData)

                    // text = JSON.stringify(text)
                    string = ""
                    text.forEach(elem => {
                        // console.log(elem)
                        string = string + elem.country + " " + elem.value + "<br>"
                    })
                    return "<b>Year: " + d + "</b><br>" + string
                })
        }

        var mouseleave = function(d) {

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
            .attr("class", function(d) { return "cl" + d.year + " circle" })
            .attr("cx", function(d) { return line_x(d.year); })
            .attr("cy", function(d) { return line_y(d.value); })
            .attr("r", 2)
            .style("fill", function(d) {
                // console.log(d)
                return color(d.country);
            })
            .style('r', "5px")
            .style("opacity", 1)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

        var vLines = line_svg.selectAll("rect")
            .data(unique_years)

        vLines
            .enter()
            .append("rect")
            .merge(vLines)
            .transition(1) // and apply changes to all of them
            .duration(1)
            .attr("class", function(d) {
                return "cl" + d
            })
            .attr('x', function(d) {
                return line_x(d) - (line_width / unique_years.length) / 2
            })
            .attr('y', 0)
            .attr('width', function() {
                return line_width / unique_years.length
            })
            .attr('height', line_height)
            .style("stroke", "red")
            .style("opacity", 0)
            .style("fill", "Gray")
            .style('fill-opacity', 0)

        vLines
            .exit()
            .remove()

        // console.log(vLines)

        var vLines = line_svg.selectAll("rect")
        vLines
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)



        var barData = dataFiltered.filter(function(d) {
            return d.year == d3.max(dataFiltered, function(d) {
                return d.year
            })
        })

        bar_update(barData)
        getMap(barData)

        var yearPlaceholder = document.getElementById('yearPlaceholder')
        try {
            while (yearPlaceholder.firstChild) {
                yearPlaceholder.removeChild(yearPlaceholder.lastChild);
            }
        } catch {}

        year = document.createElement('h3');
        year.innerHTML = "Year: " + d3.max(dataFiltered, function(d) {
            return d.year
        })
        yearPlaceholder.appendChild(year)


        function exportToCsv(filename, rows) {
            var processRow = function(row) {
                var finalVal = '';
                for (var j = 0; j < row.length; j++) {
                    var innerValue = row[j] === null ? '' : row[j].toString();
                    if (row[j] instanceof Date) {
                        innerValue = row[j].toLocaleString();
                    };
                    var result = innerValue.replace(/"/g, '""');
                    if (result.search(/("|,|\n)/g) >= 0)
                        result = '"' + result + '"';
                    if (j > 0)
                        finalVal += ',';
                    finalVal += result;
                }
                return finalVal + '\n';
            };

            var csvFile = '';
            for (var i = 0; i < rows.length; i++) {
                csvFile += processRow(rows[i]);
            }

            var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, filename);
            } else {
                var link = document.createElement("a");
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }

        dataForDownload = []
        head = []
        dataFiltered[0]

        for (const [key, value] of Object.entries(dataFiltered[0])) {
            head.push(key)
            if (key == 'dimensions') {
                for (const [key, value] of Object.entries(dataFiltered[0].dimensions)) {
                    head.push(key)
                }
            }
        }

        dataForDownload.push(head)

        dataFiltered.forEach(elem => {
            row = []
            console.log(elem)
            for (const [key, value] of Object.entries(elem)) {
                if (key == 'dimensions') {
                    for (const [key, value] of Object.entries(elem.dimensions)) {
                        row.push(value)
                    }
                } else { row.push(value) }

            }
            dataForDownload.push(row)
        })



        // exportToCsv(dataFiltered[0].seriesDescription, dataForDownload)


        var downloadButtonDiv = document.getElementById("downloadButtonDiv");

        try {
            while (downloadButtonDiv.firstChild) {
                downloadButtonDiv.removeChild(downloadButtonDiv.lastChild);
            }
        } catch {}

        downloadButton = document.createElement('input');
        downloadButton.type = "button"
        downloadButton.value = "Download data"
        downloadButton.id = "downloadButton"
        downloadButtonDiv.appendChild(downloadButton)


        var listener = function() {
            console.log(dataForDownload)
            exportToCsv(dataFiltered[0].seriesDescription.slice(0, 150), dataForDownload)
        }

        downloadButton.addEventListener('click', listener)



    }
    filteredData()



    d3.select("#dimention_block").on("click", function(d) {
        filteredData()
    })

    var deSelectAllButton = document.querySelector('#deSelectAllButton')
    deSelectAllButton.addEventListener('click', (event) => {
        filteredData()
    })

    var selectAllButton = document.querySelector('#selectAllButton')
    selectAllButton.addEventListener('click', (event) => {
        filteredData()
    })

    var menaSelectButton = document.querySelector('#menaSelectButton')
    menaSelectButton.addEventListener('click', (event) => {
        filteredData()
    })

    countryList.forEach(function(d) {
        ids = d.geoAreaName.toString()
        cids = ids.replace(/\s/g, '')
        var cb = document.querySelector('#' + cids);
        cb.addEventListener('click', (event) => {
            filteredData()
        })
    })
}