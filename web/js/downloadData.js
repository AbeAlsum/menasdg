function downloadData() {
    console.log('downloadData()')
    var indicator = d3.select("#seriesSelector").property("value")
    var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Series/Data?seriesCode=' + indicator + '&pageSize=100&areaCode=12&areaCode=1&areaCode=20&areaCode=24&areaCode=660&areaCode=48&areaCode=120&areaCode=152&areaCode=156&areaCode=344&areaCode=446&areaCode=174&areaCode=262&areaCode=818&areaCode=232&areaCode=231&areaCode=364&areaCode=368&areaCode=414&areaCode=422&areaCode=430&areaCode=434&areaCode=478&areaCode=504&areaCode=562&areaCode=512&areaCode=586&areaCode=275&areaCode=620&areaCode=634' // заглушка із регіоном

    // valuesTable = document.getElementById('line_block')
    // try {
    //     while (valuesTable.firstChild) {
    //         valuesTable.removeChild(valuesTable.lastChild);
    //     }
    // } catch {}


    d3.json(url, function(test) {
        console.log(test.totalElements)
        if (test.totalElements <= 100) {} else {
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
            if (d.value != "NaN" || d.value != 0) {

                if (countryUnique.includes(d.geoAreaName)) {} else {
                    countryUnique.push(d.geoAreaName)
                    countryList.push({
                        geoAreaName: d.geoAreaName,
                        geoAreaCode: d.geoAreaCode
                    })
                }
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
                    if (dimentionsDict.length == 0) {
                        dimentionsDict.push({
                            name: key,
                            value: value
                        })
                        if (listOfKeys.includes(key)) {} else {
                            listOfKeys.push(key)
                        }

                    } else {
                        if (listOfKeys.includes(key)) {
                            dimentionsDict.forEach(function(dimention) {
                                if (dimention.name == key) {
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
                                    if (listOfKeys.includes(key)) {} else {
                                        listOfKeys.push(key)
                                    }
                                } else {}
                            })
                        } else {
                            dimentionsDict.push({
                                name: key,
                                value: value
                            })
                            if (listOfKeys.includes(key)) {} else {
                                listOfKeys.push(key)
                            }
                        }
                    }


                }
            } else {}
        })

        countryList.forEach(function(d) {
            //console.log(d)
            dv = document.createElement('div');
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
            list.appendChild(dv)
            dv.appendChild(lab)
            dv.appendChild(opt)
        })

        var dimention_block = document.getElementById('dimention_block')
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



        getLineChart(data, countryList, dimentionsDict)
    })
}


d3.select("#seriesSelector").on("change.download", function(d) {
    downloadData()
})