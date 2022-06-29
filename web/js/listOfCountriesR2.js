function listOfCountries() {

    function update(indicator) {
        var indicator = d3.select("#seriesSelector").property("value")

        var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Series/Data?seriesCode=' + indicator + '&pageSize=100&areaCode=12&areaCode=1&areaCode=20&areaCode=24&areaCode=660&areaCode=48&areaCode=120&areaCode=152&areaCode=156&areaCode=344&areaCode=446&areaCode=174&areaCode=262&areaCode=818&areaCode=232&areaCode=231&areaCode=364&areaCode=368&areaCode=414&areaCode=422&areaCode=430&areaCode=434&areaCode=478&areaCode=504&areaCode=562&areaCode=512&areaCode=586&areaCode=275&areaCode=620&areaCode=634'

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
                url = 'https://unstats.un.org/SDGAPI/v1/sdg/Series/Data?seriesCode=' + indicator + '&pageSize=' + test.totalElements + '&areaCode=12&areaCode=1&areaCode=20&areaCode=24&areaCode=660&areaCode=48&areaCode=120&areaCode=152&areaCode=156&areaCode=344&areaCode=446&areaCode=174&areaCode=262&areaCode=818&areaCode=232&areaCode=231&areaCode=364&areaCode=368&areaCode=414&areaCode=422&areaCode=430&areaCode=434&areaCode=478&areaCode=504&areaCode=562&areaCode=512&areaCode=586&areaCode=275&areaCode=620&areaCode=634' // заглушка із регіоном
            }

            console.log(url)



            d3.json(url, function(error, json) {
                if (error) return console.warn(error);
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
                    console.log(d)

                    if (d.value == "NaN") {
                        console.log(d.value)
                    } else {
                        console.log(d.value)
                        if (countryUnique.includes(d.geoAreaName)) {} else {
                            countryUnique.push(d.geoAreaName)
                            countryList.push({
                                geoAreaName: d.geoAreaName,
                                geoAreaCode: d.geoAreaCode
                            })
                        }
                    }
                })

                countryList.forEach(function(d) {
                    opt = document.createElement('option');
                    opt.innerHTML = d.geoAreaName
                    opt.value = d.geoAreaCode
                    list.appendChild(opt)
                })
            });



        })
    }

    d3.select("#seriesSelector").on("click.seriesList", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")

        console.log(d3.select(this))
            //console.log(selectedOption)
            // run the updateChart function with this selected option
        update(selectedOption)
    })
}
listOfCountries()