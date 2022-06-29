function getGraphs() {
    //console.log("getSeries")
    function update_params(country) {

        var indicator = d3.select("#seriesSelector").property("value")

        var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Series/Data?seriesCode=' + indicator + '&pageSize=100&areaCode=' + country // заглушка із регіоном

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

            } else {
                url = 'https://unstats.un.org/SDGAPI/v1/sdg/Series/Data?seriesCode=' + indicator + '&pageSize=' + test.totalElements + '&areaCode=' + country // заглушка із регіоном
            }



        })

        d3.json(url, function(json) {
            console.log(url)
            var data = []
            var dimentionsDict = []
            var listOfKeys = []
                // для кожного запису в таблиці із даними


            json.data.forEach(function(d) {
                //console.log(d)
                if (d.value != "NaN") {
                    //console.log(d.timePeriodStart)
                    date = d3.timeParse("%Y")(d.timePeriodStart)
                    data.push({
                        year: date,
                        value: d.value,
                        series: d.series,
                        seriesDescription: d.seriesDescription,
                        dimensions: d.dimensions,
                        country: d.geoAreaName
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



            // json.data.forEach(function(d) {
            //     //console.log(d)
            //     date = d3.timeParse("%Y")(d.timePeriodStart)
            //     data.push({
            //             year: date,
            //             value: d.value,
            //             series: d.series,
            //             seriesDescription: d.seriesDescription
            //         })
            //         // для кожного запису в діменшенс кожного запису
            //     for (const [key, value] of Object.entries(d.dimensions)) {

            //         // спочатку перевіряємо чи є цей ключ у словнику ключів
            //         // if (listOfKeys.includes(key)) {

            //         // } else { listOfKeys.push(key) }

            //         // для кожного запису в списку із ключами
            //         // listOfKeys.forEach(function(fromKey) {
            //         //     // якщо запис у списку ключів співпадає із ключем у запису в таблиці даних 

            //             if (key == fromKey) {
            //                 console.log(fromKey)
            //                 console.log(key)
            //                     // якщо довжина фінального словника = 0 - просто додаємо запис
            //                 if (dimentionsDict.length == 0) {
            //                     dimentionsDict.push({
            //                             name: fromKey,
            //                             value: value
            //                         })
            //                         // в іншому випадку проходимось по всіх записах фінального словника
            //                 } else {
            //                     dimentionsDict.forEach(function(dimention) {
            //                         console.log(dimention)
            //                             // якщо dimention.name = ключу із таблиці із даними 
            //                         if (dimention.name == fromKey) {
            //                             var listOfThings = [] // створюємо порожній список
            //                                 // якщо у dimention.value список - перебираємо його і додаємо до списку кожне значення, інакше додаємо одне значення
            //                             try {
            //                                 dimention.value.forEach(function(singleValue) {
            //                                     listOfThings.push(singleValue)
            //                                 })
            //                             } catch {
            //                                 listOfThings.push(dimention.value)
            //                             }
            //                             // якщо у списку значень вже є значення нічого не робиномо, інакше - записуємо нове значення
            //                             if (listOfThings.includes(value)) {

            //                             } else { listOfThings.push(value) }

            //                             dimentionsDict = dimentionsDict.filter((item) => typeof(item) === 'object' && item.name !== fromKey); // отфильтровать массив, в котором подходить под условие будут только те объекты у которых поле value не равняется 'b' и не является строкой
            //                             dimentionsDict.push({
            //                                 name: fromKey,
            //                                 value: listOfThings
            //                             })
            //                         } else {}
            //                     })
            //                 }
            //             } else {}
            //         })



            //         //console.log(key, value);

            //     }
            // });

            // dimentionsList = new Set(dimentionsList)
            //console.log(dimentionsDict)

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

            function filteredData() {


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
                console.log(actualParameters)

                dataFiltered = data.filter(function(e) {
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
                        console.log("Selected params: " + selectorOne)
                        console.log("Original params: " + selectorOne)
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
                    .domain(d3.extent(data, function(d) { return d.year; }))
                    .range([0, width]);
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x).ticks(5));

                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([0, d3.max(data, function(d) { return +d.value; })])
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

                // var margin = { top: 10, right: 30, bottom: 30, left: 10 },
                //     width = d3.select("#line_block").node().getBoundingClientRect().width - margin.left - margin.right,
                //     height = 400 - margin.top - margin.bottom;

                // append the svg object to the body of the page
                // Add an svg element for each group. The will be one beside each other and will go on the next row when no more room available
                // var svg = d3.select("#line_block")
                //     .selectAll("uniqueChart")
                //     .data(sumstat)
                //     .enter()
                //     .append("svg")
                //     .attr("width", width + margin.left + margin.right)
                //     .attr("height", height + margin.top + margin.bottom)
                //     .append("g")
                //     .attr("transform",
                //         "translate(" + margin.left + "," + margin.top + ")");

                // Add X axis --> it is a date format
                // var x = d3.scaleTime()
                //     .domain(d3.extent(data, function(d) { return d.year; }))
                //     .range([0, width]);
                // svg
                //     .append("g")
                //     .attr("transform", "translate(0," + height + ")")
                //     .call(d3.axisBottom(x).ticks(3));

                // //Add Y axis
                // var y = d3.scaleLinear()
                //     .domain([0, d3.max(data, function(d) { return +d.value; })])
                //     .range([height, 0]);
                // svg.append("g")
                //     .call(d3.axisLeft(y).ticks(5));

                // // color palette
                // var color = d3.scaleOrdinal()
                //     .domain(allKeys)
                //     .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])

                // // Draw the line
                // svg
                //     .append("path")
                //     .attr("fill", "none")
                //     .attr("stroke", function(d) { return color(d.key) })
                //     .attr("stroke-width", 1.9)
                //     .attr("d", function(d) {
                //         return d3.line()
                //             .x(function(d) { return x(d.year); })
                //             .y(function(d) { return y(+d.value); })
                //             (d.values)
                //     })

                // // Add titles
                // svg
                //     .append("text")
                //     .attr("text-anchor", "start")
                //     .attr("y", -5)
                //     .attr("x", 0)
                //     .text(function(d) { return (d.key) })
                //     .style("fill", function(d) { return color(d.key) })
            }

            //тут треба додати слухачі на всі селектори із параметрами для оновлення функції
            dimentionsDict.forEach(function(d) {
                ids = d.name.toString()
                cids = ids.replace(/\s/g, '')
                d3.select("#" + cids).on("click.filteredData", function(d) { filteredData() })
            })

            // d3.select("#countriesSelector").on("click.filteredData", function(d) {
            //     filteredData()
            // })
        })
    };


    d3.select("#countriesSelector").on("change.filteredData", function(d) {
        // recover the option that has been chosen
        var country = d3.select(this).property("value")
            //console.log(country)
        update_params(country)
    })
}
getGraphs()