//Отримуємо список серій відповідно до обраного індикатору

function listOfSeries() {

    function update(option) {
        var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Indicator/' + option + '/Series/List'
        console.log(url)
        d3.json(url, function(error, json) {
            if (error) return console.warn(error);
            //console.log(json)
            var list = document.getElementById('seriesSelector')
            try {
                while (list.firstChild) {
                    list.removeChild(list.lastChild);
                }
            } catch {}

            try {
                opt = document.createElement('option');
                opt.innerHTML = "select series"
                list.appendChild(opt)
                json[0].series.forEach(function(d) {
                    opt = document.createElement('option');
                    opt.innerHTML = d.description
                    opt.value = d.code
                    list.appendChild(opt)
                })
            } catch {}
        });
    }
    d3.select("#indicatorsList").on("click.seriesList", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
            //console.log(selectedOption)
            // run the updateChart function with this selected option
        update(selectedOption.split(';')[0])
            // indicatorPlaceHolder(selectedOption.split(';')[1])
    })

}
listOfSeries()