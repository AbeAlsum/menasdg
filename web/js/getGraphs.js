function getGraphs() {
    //console.log("getSeries")




    function update_params(country) {
        console.log(country)

        var dimentionsList = []
        var indicator = d3.select("#seriesSelector").property("value")

        console.log(indicator)

        dimentions_url = "https://unstats.un.org/SDGAPI/v1/sdg/Series/" + indicator + "/Dimensions"

        var dimention_block = document.getElementById('dimention_block')
            //console.log(dimentions)
        try {
            while (dimention_block.firstChild) {
                dimention_block.removeChild(dimention_block.lastChild);
            }
        } catch {}

        var dimentionsDict = []

        function doSomethingWithData(dimentionsList) {
            dimentionsList.forEach(function(d) {
                //var val = d3.select(d).property("value")
                console.log(d)
            })
            return dimentionsList
        }

        d3.json(dimentions_url, function(dimentions) {
            dimentions.forEach(function(d) {
                dim = document.createElement('select');
                dimention_block.appendChild(dim)
                ids = d.id.toString()
                cids = ids.replace(/\s/g, '')
                dim.classList.add(cids)
                dimentionsList.push(cids)

                d.codes.forEach(function(dc) {
                    dim_option = document.createElement('option');
                    dim_option.innerHTML = dc.description
                    dim_option.value = dc.code
                    dim.appendChild(dim_option)
                })

            });
            doSomethingWithData(dimentionsList)
        })

        console.log(dimentionsList)
            // dimentionsList.forEach(function(d) {
            //     //var val = d3.select(d).property("value")
            //     console.log(d)
            // })


        attribute_url = "https://unstats.un.org/SDGAPI/v1/sdg/Series/" + indicator + "/Attributes"

        attribute_block = document.getElementById('attribute_block')
        try {
            while (attribute_block.firstChild) {
                attribute_block.removeChild(attribute_block.lastChild);
            }
        } catch {}

        d3.json(attribute_url, function(attribute) {
            //console.log(attribute)
            attribute.forEach(function(d) {
                attr = document.createElement('select');
                attribute_block.appendChild(attr)
                    // console.log(d)
                    // console.log(d.id)
                    // console.log(d.codes)
                d.codes.forEach(function(dc) {
                    attr_option = document.createElement('option');
                    attr_option.innerHTML = dc.description
                    attr_option.value = dc.code
                    attr.classList.add(d.id)
                    attr.appendChild(attr_option)
                })
            });


        })

        var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Series/Data?seriesCode=' + indicator + '&pageSize=100&areaCode=' + country // заглушка із регіоном

        console.log("getGraphs: " + url)

        valuesTable = document.getElementById('line_block')
        try {
            while (valuesTable.firstChild) {
                valuesTable.removeChild(valuesTable.lastChild);
            }
        } catch {}

        //listOfCountries(this.value)


        d3.json(url, function(json) {
            var data = []
            json.data.forEach(function(d) {
                date = d3.timeParse("%Y")(d.timePeriodStart)
                data.push({
                    year: date,
                    value: d.value,
                    series: d.series,
                    seriesDescription: d.seriesDescription
                })
            });





            var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
                .key(function(d) { return d.series; })
                .entries(data);

            allKeys = sumstat.map(function(d) { return d.key })

            var margin = { top: 10, right: 30, bottom: 30, left: 10 },
                width = d3.select("#line_block").node().getBoundingClientRect().width - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            // Add an svg element for each group. The will be one beside each other and will go on the next row when no more room available
            var svg = d3.select("#line_block")
                .selectAll("uniqueChart")
                .data(sumstat)
                .enter()
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            // Add X axis --> it is a date format
            var x = d3.scaleLinear()
                .domain(d3.extent(data, function(d) { return d.year; }))
                .range([0, width]);
            svg
                .append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(3));

            //Add Y axis
            var y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return +d.value; })])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y).ticks(5));

            // color palette
            var color = d3.scaleOrdinal()
                .domain(allKeys)
                .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])

            // Draw the line
            svg
                .append("path")
                .attr("fill", "none")
                .attr("stroke", function(d) { return color(d.key) })
                .attr("stroke-width", 1.9)
                .attr("d", function(d) {
                    return d3.line()
                        .x(function(d) { return x(d.year); })
                        .y(function(d) { return y(+d.value); })
                        (d.values)
                })

            // Add titles
            svg
                .append("text")
                .attr("text-anchor", "start")
                .attr("y", -5)
                .attr("x", 0)
                .text(function(d) { return (d.key) })
                .style("fill", function(d) { return color(d.key) })



        });

    }
    d3.select("#countriesSelector").on("change.series_2List", function(d) {
        // recover the option that has been chosen
        var country = d3.select(this).property("value")
        update_params(country)
    })
}
getGraphs()