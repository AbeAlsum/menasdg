function listOfTargets() {
    function update(option) {

        var url = ' https://unstats.un.org/SDGAPI/v1/sdg/Goal/' + option + '/Target/List?includechildren=true'
        console.log(url)
        d3.json(url, function(error, json) {
            if (error) return console.warn(error);
            //console.log(json)
            var list = document.getElementById('targetsSelector')
            try {
                while (list.firstChild) {
                    list.removeChild(list.lastChild);
                }
            } catch {}
            json[0].targets.forEach(function(d) {
                opt = document.createElement('option');

                opt.innerHTML = d.description.substr(0, 200) + "..."
                opt.value = d.code
                list.appendChild(opt)
            })

        });
    }

    document.querySelector('#goalsSelector').addEventListener('select.change', (e) => {
        const btn = e.target.querySelector('.select__toggle');
        // console.log(btn)
        // выбранное значение
        console.log(`Выбранное значение: ${btn.value}`);
        // индекс выбранной опции
        const selected = e.target.querySelector('.select__option_selected');
        // console.log(selected)
        const text = selected ? selected.textContent : '';
        // console.log(`Выбранный текст опции: ${text}`);
        update(btn.value)
    });
}
listOfTargets()