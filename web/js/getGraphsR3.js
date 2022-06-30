function getGraphs() {
    //console.log("getSeries")

    var indicator = d3.select("#seriesSelector").property("value")
        //console.log(indicator)
        //тут Ареа код треба підшифтити, щоб він точно відповідав потрібним країнам
    var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Series/Data?seriesCode=' + indicator + '&pageSize=100&areaCode=12&areaCode=1&areaCode=20&areaCode=24&areaCode=660&areaCode=48&areaCode=120&areaCode=152&areaCode=156&areaCode=344&areaCode=446&areaCode=174&areaCode=262&areaCode=818&areaCode=232&areaCode=231&areaCode=364&areaCode=368&areaCode=414&areaCode=422&areaCode=430&areaCode=434&areaCode=478&areaCode=504&areaCode=562&areaCode=512&areaCode=586&areaCode=275&areaCode=620&areaCode=634' // заглушка із регіоном

    console.log("getGraphs: " + url)

    valuesTable = document.getElementById('line_block')
    try {
        while (valuesTable.firstChild) {
            valuesTable.removeChild(valuesTable.lastChild);
        }
    } catch {}

    //listOfCountries(this.value)

    d3.json(url, function(test) {
        console.log(test.totalElements)
        if (test.totalElements <= 100) {
            //тут Ареа код треба підшифтити, щоб він точно відповідав потрібним країнам
        } else {
            url = 'https://unstats.un.org/SDGAPI/v1/sdg/Series/Data?seriesCode=' + indicator + '&pageSize=' + test.totalElements + '&areaCode=12&areaCode=1&areaCode=20&areaCode=24&areaCode=660&areaCode=48&areaCode=120&areaCode=152&areaCode=156&areaCode=344&areaCode=446&areaCode=174&areaCode=262&areaCode=818&areaCode=232&areaCode=231&areaCode=364&areaCode=368&areaCode=414&areaCode=422&areaCode=430&areaCode=434&areaCode=478&areaCode=504&areaCode=562&areaCode=512&areaCode=586&areaCode=275&areaCode=620&areaCode=634'
        }



    })

    d3.json(url, function(json) {
        console.log(url)
        var data = []
        var dimentionsDict = []
        var listOfKeys = []
            // для кожного запису в таблиці із даними

        //console.log(json)
        var list = document.getElementById('countriesSelector')
        try {
            while (list.firstChild) {
                list.removeChild(list.lastChild);
            }
        } catch {}

        var countryList = []
        var countryUnique = []


        json.data.forEach(function(d) {
            //console.log(d)
            if (d.value != "NaN") {

                if (countryUnique.includes(d.geoAreaName)) {} else {
                    countryUnique.push(d.geoAreaName)
                    countryList.push({
                        geoAreaName: d.geoAreaName,
                        geoAreaCode: d.geoAreaCode
                    })
                }
                //console.log(countryUnique)
                //console.log(countryList)


                //console.log(d.timePeriodStart)
                date = d3.timeParse("%Y")(d.timePeriodStart)
                data.push({
                    year: date,
                    value: d.value,
                    series: d.series,
                    seriesDescription: d.seriesDescription,
                    dimensions: d.dimensions,
                    country: d.geoAreaName,
                    geoAreaCode: d.geoAreaCode
                })


                for (const [key, value] of Object.entries(d.dimensions)) {
                    //console.log("індекс запису: " + data.length)
                    //console.log("Перше значення: " + key + " : " + value)
                    // if (listOfKeys.includes(key)) {} else {
                    //     listOfKeys.push(key)
                    //         //console.log(listOfKeys)
                    // }

                    if (dimentionsDict.length == 0) {
                        //console.log('перше входження ключа: ' + key)
                        dimentionsDict.push({
                            name: key,
                            value: value
                        })
                        if (listOfKeys.includes(key)) {} else {
                            listOfKeys.push(key)
                        }

                    } else {
                        if (listOfKeys.includes(key)) {
                            //console.log(listOfKeys)
                            //console.log("listOfKeys ALREADY includes" + key)
                            dimentionsDict.forEach(function(dimention) {
                                //console.log(dimention)
                                if (dimention.name == key) {
                                    //console.log('якби тут все працювало: ' + key)
                                    var listOfThings = []

                                    try {
                                        dimention.value.forEach(function(singleValue) {
                                            listOfThings.push(singleValue)
                                        })
                                    } catch {
                                        listOfThings.push(dimention.value)
                                    }


                                    if (listOfThings.includes(value)) {} else { listOfThings.push(value) }

                                    dimentionsDict = dimentionsDict.filter(function(e) { return e.name !== key; });

                                    dimentionsDict.push({
                                            name: key,
                                            value: listOfThings
                                        })
                                        //console.log(dimentionsDict)
                                    if (listOfKeys.includes(key)) {} else {
                                        listOfKeys.push(key)
                                    }
                                } else {
                                    //console.log('тут виключення без наслідків')
                                }
                            })
                        } else {
                            //console.log("add new to dimentionsDict with key: " + key)
                            dimentionsDict.push({
                                name: key,
                                value: value
                            })
                            if (listOfKeys.includes(key)) {} else {
                                listOfKeys.push(key)
                            }
                            //console.log(dimentionsDict.length)
                        }
                    }


                }
            } else {}
        })

        countryList.forEach(function(d) {
            console.log(d)
            opt = document.createElement('input');
            lab = document.createElement('label');
            opt.innerHTML = d.geoAreaName
            opt.value = d.geoAreaCode
            opt.type = "checkbox"
            ids = d.geoAreaName.toString()
            cids = ids.replace(/\s/g, '')
            opt.id = cids
            lab.for = d.geoAreaCode
            lab.innerHTML = d.geoAreaName
            list.appendChild(lab)
            list.appendChild(opt)
        })

        var dimention_block = document.getElementById('dimention_block')
            //console.log(dimentions)
        try {
            while (dimention_block.firstChild) {
                dimention_block.removeChild(dimention_block.lastChild);
            }
        } catch {}

        dimentionsDict.forEach(function(d) {
            dim = document.createElement('select');
            dimention_block.appendChild(dim)
            ids = d.name.toString()
            cids = ids.replace(/\s/g, '')
            dim.id = cids

            d.value.forEach(function(dc) {
                dim_option = document.createElement('option');
                dim_option.innerHTML = dc
                dim_option.value = dc
                dim.appendChild(dim_option)
            })

        })

        //console.log(data)

        var margin = { top: 10, right: 30, bottom: 30, left: 10 },
            width = d3.select("#line_block").node().getBoundingClientRect().width - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        var svg = d3.select("#line_block")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        function filteredData(countries) {

            //console.log(countries)

            dataFilteredCountry = data.filter(function(e) {
                //console.log(countries)
                if (countries.includes(e.geoAreaCode)) { return e } else {}
            })

            console.log(dataFilteredCountry)

            //тут треба зібрати актуальні значення параметрів, тобто прочитати значення селекторів та відфільтрувати data
            actualParameters = []
            dimentionsDict.forEach(function(d) {
                    ids = d.name.toString()
                    cids = ids.replace(/\s/g, '')
                        //console.log('#' + cids)
                        //console.log(d3.select('#' + cids).property("value"))
                    actualParameters.push({
                        name: d.name,
                        value: d3.select('#' + cids).property("value")
                    })
                })
                //console.log(actualParameters)

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
                    //console.log("Selected params: " + selectorOne)
                    //console.log("Original params: " + selectorOne)
                    return e;
                } else {}

            });

            console.log(dataFiltered)


            //dimentionsDict = dimentionsDict.filter(function(e) { return e.name !== key; });

            var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
                .key(function(d) { return d.country; })
                .entries(dataFiltered);

            //allKeys = sumstat.map(function(d) { return d.key })
            var res = sumstat.map(function(d) { return d.key }) // list of group names


            // Add X axis --> it is a date format
            var x = d3.scaleTime()
                .domain(d3.extent(dataFiltered, function(d) { return d.year; }))
                .range([0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(5));

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, d3.max(dataFiltered, function(d) { return +d.value; })])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // color palette

            var color = d3.scaleOrdinal()
                .domain(res)
                .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])

            // Draw the line
            svg.selectAll(".line")
                .data(sumstat)
                .enter()
                .append("path")
                .attr("fill", "none")
                .attr("stroke", function(d) { return color(d.key) })
                .attr("stroke-width", 1.5)
                .attr("d", function(d) {
                    return d3.line()
                        .x(function(d) { return x(d.year); })
                        .y(function(d) { return y(+d.value); })
                        (d.values)
                })

        }

        //тут треба додати слухачі на всі селектори із параметрами для оновлення функції
        dimentionsDict.forEach(function(d) {
            ids = d.name.toString()
            cids = ids.replace(/\s/g, '')
            d3.select("#" + cids).on("click.filteredData", function(d) { filteredData() })
        })

        function countryListfiltered() {
            //console.log(countryList)

            countryList.forEach(function(d) {
                //console.log(d)
                ids = d.geoAreaName.toString()
                cids = ids.replace(/\s/g, '')
                var cb = document.querySelector('#' + cids);
                cb.addEventListener('click', (event) => {
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
                        filteredData(countries)
                    })
                })

            })

        }
        countryListfiltered()


        // d3.select("#countriesSelector").on("click.filteredData", function(d) {
        //     filteredData()
        // })
    })


    // d3.select("#countriesSelector").on("change.filteredData", function(d) {
    //     // recover the option that has been chosen
    //     var country = d3.select(this).property("value")
    //         //console.log(country)
    //     update_params(country)
    // })
}
d3.select("#seriesSelector").on("click.getGraphs", function(d) {
    getGraphs()
})