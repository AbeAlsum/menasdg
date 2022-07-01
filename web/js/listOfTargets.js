function listOfTargets() {

    function update(option) {

        var url = ' https://unstats.un.org/SDGAPI/v1/sdg/Goal/' + option + '/Target/List?includechildren=true'
            //console.log(url)
        d3.json(url, function(error, json) {
            if (error) return console.warn(error);
            //console.log(json)
            var list = document.getElementById('targetsSelector')
            try {
                while (list.firstChild) {
                    list.removeChild(list.lastChild);
                }
            } catch {}
            opt = document.createElement('option');
            opt.innerHTML = "select target"
            list.appendChild(opt)
            json[0].targets.forEach(function(d) {
                opt = document.createElement('option');
                opt.innerHTML = d.description
                opt.value = d.code
                list.appendChild(opt)
            })
        });
    }

    d3.select("#goalsSelector").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
            //console.log(selectedOption)
            // run the updateChart function with this selected option
        update(selectedOption)
    })

}
listOfTargets()