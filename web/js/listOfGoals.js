function listOfGoals() {
    var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false'
    d3.json(url, function(error, json) {
        if (error) return console.warn(error);
        //console.log(json)
        var list = document.getElementById('goalsSelector')
        json.forEach(function(d) {
            opt = document.createElement('option');
            opt.innerHTML = d.description
            opt.value = d.code
            list.appendChild(opt)
        })
    });
}
listOfGoals()