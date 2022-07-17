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
            // opt = document.createElement('option');
            // opt.innerHTML = "select indicator"
            // list.appendChild(opt)
            json.forEach(function(d) {
                if (d.target === option) {
                    opt = document.createElement('option');
                    opt.innerHTML = d.description
                    opt.value = d.code
                    list.appendChild(opt)
                } else {}
            })
        });

    }

    document.querySelector('#targetsSelector').addEventListener('select.change', (e) => {
        const btn = e.target.querySelector('.select__toggle');
        // выбранное значение
        console.log(`Выбранное значение: ${btn.value}`);
        update(btn.value)
            // индекс выбранной опции
        const selected = e.target.querySelector('.select__option_selected');
        const text = selected ? selected.textContent : '';
        console.log(`Выбранный текст опции: ${text}`);
    });

}
listOfIndicators()