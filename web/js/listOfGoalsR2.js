function listOfGoals() {
    var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false'
    d3.json(url, function(error, json) {
        if (error) return console.warn(error);
        var GoalsList = []
        json.forEach(function(d) {
            var goal = []
            goal.push(d.code)
            goal.push(d.description)
            GoalsList.push(goal)
        })

        new CustomSelect('#goalsSelector', {
            name: 'goal',
            targetValue: 'ford',
            options: GoalsList,
            onSelected(select, option) {
                // выбранное значение
                console.log(`Выбранное значение: ${select.value}`);
                // индекс выбранной опции
                console.log(`Индекс выбранной опции: ${select.selectedIndex}`);
                // выбранный текст опции
                const text = option ? option.textContent : '';
                console.log(`Выбранный текст опции: ${text}`);
            },
        });



    });


}
listOfGoals()