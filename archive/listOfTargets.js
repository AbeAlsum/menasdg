function listOfTargets() {

    function update(option) {

        var url = ' https://unstats.un.org/SDGAPI/v1/sdg/Goal/' + option + '/Target/List?includechildren=true'
            //console.log(url)
        d3.json(url, function(error, json) {
            if (error) return console.warn(error);
            //console.log(json)
            var TargetsList = []
            json[0].targets.forEach(function(d) {
                var goal = []
                goal.push(d.code)
                goal.push(d.description)
                TargetsList.push(goal)
            })


            targetsSelector = new CustomSelect('#targetsSelector', {
                name: TargetsList[0][0],
                targetValue: TargetsList[0][0],
                options: TargetsList,
                // onSelected(select, option) {
                //     // выбранное значение
                //     console.log(`Выбранное значение: ${select.value}`);
                //     // индекс выбранной опции
                //     console.log(`Индекс выбранной опции: ${select.selectedIndex}`);
                //     // выбранный текст опции
                //     const text = option ? option.textContent : '';
                //     console.log(`Выбранный текст опции: ${text}`);
                // },
            });
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