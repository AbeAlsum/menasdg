//Обираємо список індикаторів відповідно до обраної цілі

function listOfIndicators() {

    function update(option) {

        var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Indicator/List'
            //console.log(url)
        d3.json(url, function(error, json) {
            if (error) return console.warn(error);
            //console.log(json)
            var list = document.getElementById('indicatorsList')
            try {
                while (list.firstChild) {
                    list.removeChild(list.lastChild);
                }
            } catch {}
            opt = document.createElement('option');
            opt.innerHTML = "select indicator"
            list.appendChild(opt)
            json.forEach(function(d) {
                if (d.target === option) {
                    //console.log(d.target)
                    opt = document.createElement('option');
                    opt.innerHTML = d.description
                    opt.value = d.code
                    list.appendChild(opt)
                } else {}
            })
        });

    }

    d3.select("#targetsSelector").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
            //console.log(selectedOption)
            // run the updateChart function with this selected option
        update(selectedOption)
    })

}
listOfIndicators()