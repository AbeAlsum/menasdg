//Отримуємо список країн щодо яких є інформація відповідно до обраного індекатору
function listOfCountries() {



    function update(option) {

        //console.log("listOfCountries")
        var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Series/' + option + '/GeoAreas'
            //console.log(url)
            //console.log(url)
        d3.json(url, function(error, json) {
            if (error) return console.warn(error);
            //console.log(json)
            var list = document.getElementById('countriesSelector')
            try {
                while (list.firstChild) {
                    list.removeChild(list.lastChild);
                }
            } catch {}
            json.forEach(function(d) {
                opt = document.createElement('option');
                opt.innerHTML = d.geoAreaName
                opt.value = d.geoAreaCode
                list.appendChild(opt)
            })

        });
    }
    d3.select("#seriesSelector").on("click.seriesList", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
            //console.log(selectedOption)
            // run the updateChart function with this selected option
        update(selectedOption)
    })

}
listOfCountries()