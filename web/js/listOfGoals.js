function listOfGoals() {
    var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false'
    d3.json(url, function(error, json) {
        if (error) return console.warn(error);
        //console.log(json)
        var list = document.getElementById('goalsSelector')
            // opt = document.createElement('option');
            // opt.innerHTML = "select goal"
            // list.appendChild(opt)
        json.forEach(function(d) {
            opt = document.createElement('option');
            opt.innerHTML = d.description //.slice(0, 30) + "..." //work with lenth of string
            opt.value = d.code + ";" + d.description
            list.appendChild(opt)
        })

        console.log(list)
    });
}
listOfGoals()