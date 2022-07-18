function downloadData() {
    console.log('downloadData()')
    var indicator = d3.select("#seriesSelector").property("value")
    var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Series/Data?seriesCode=' + indicator + '&pageSize=100&areaCode=12&areaCode=48&areaCode=262&areaCode=818&areaCode=364&areaCode=368&areaCode=400&areaCode=414&areaCode=422&areaCode=434&areaCode=478&areaCode=504&areaCode=275&areaCode=634&areaCode=682&areaCode=706&areaCode=729&areaCode=760&areaCode=788&areaCode=732&areaCode=887&areaCode=15&areaCode=2&areaCode=1&areaCode=145&areaCode=840&areaCode=156' // заглушка із регіоном

    d3.json(url, function(test) {
        console.log(test.totalElements)
        if (test.totalElements <= 100) {} else {
            url = 'https://unstats.un.org/SDGAPI/v1/sdg/Series/Data?seriesCode=' + indicator + '&pageSize=' + test.totalElements + '&areaCode=12&areaCode=48&areaCode=262&areaCode=818&areaCode=364&areaCode=368&areaCode=400&areaCode=414&areaCode=422&areaCode=434&areaCode=478&areaCode=504&areaCode=275&areaCode=634&areaCode=682&areaCode=706&areaCode=729&areaCode=760&areaCode=788&areaCode=732&areaCode=887&areaCode=15&areaCode=2&areaCode=1&areaCode=145&areaCode=840&areaCode=156'
        }
    })

    d3.json(url, function(json) {

        console.log(url)
        var data = []
        var dimentionsDict = []
        var listOfKeys = []
        var dimentionsDict_2 = []
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
                    geoAreaName = d.geoAreaName.replace('(', '')
                    geoAreaName = geoAreaName.replace(')', '')
                    geoAreaName = geoAreaName.replace(',', '')
                    countryList.push({
                        geoAreaName: geoAreaName,
                        geoAreaCode: d.geoAreaCode
                    })
                }
                // date = d3.timeParse("%Y")(d.timePeriodStart)
                date = d.timePeriodStart
                data.push({
                    year: date,
                    value: d.value,
                    series: d.series,
                    seriesDescription: d.seriesDescription,
                    dimensions: d.dimensions,
                    country: geoAreaName,
                    geoAreaCode: d.geoAreaCode
                })

                singleDimention = ""
                dimentionsList = []
                for (const [key, value] of Object.entries(d.dimensions)) {
                    singleDimention = singleDimention + key + " : " + value + ', '
                    dimentionsList.push({
                        name: key,
                        value: value
                    })
                }
                if (listOfKeys.length != 0) {
                    if (listOfKeys.includes(singleDimention)) {} else {
                        listOfKeys.push(singleDimention)
                        dimentionsDict_2.push({
                            singleD: singleDimention.slice(0, -2),
                            listed: dimentionsList
                        })
                    }
                } else {
                    listOfKeys.push(singleDimention)
                    dimentionsDict_2.push({
                        singleD: singleDimention.slice(0, -2),
                        listed: dimentionsList
                    })
                }
            } else {}
        })

        console.log(dimentionsDict_2)


        menaCountries = [12, 48, 262, 818, 364, 368, 400, 414, 422, 434, 478, 504, 275, 634, 682, 706, 729, 760, 788]
        countryList.forEach(function(d) {
            //console.log(d)
            dv = document.createElement('div');
            opt = document.createElement('input');
            lab = document.createElement('label');
            opt.innerHTML = d.geoAreaName
            opt.value = d.geoAreaCode

            if (menaCountries.includes(+d.geoAreaCode)) {
                opt.classList.add('menaCountry')
            } else {
                opt.classList.add('benchmark')
            }

            opt.type = "checkbox"
            opt.name = "ck"
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

        dimentionsDict_2.forEach(function(d) {
            dim_option = document.createElement('option');
            dim_option.innerHTML = d.singleD
            dim_option.data = d.listed
            dimention_block.appendChild(dim_option)
        })



        getLineChart(data, countryList, dimentionsDict)
    })
}


d3.select("#seriesSelector").on("change.download", function(d) {
    downloadData()
})