function downloadData() {
    var btn = document.querySelector("#seriesSelector").querySelector('.select__toggle');
    console.log(btn.value)
    var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Series/Data?seriesCode=' + btn.value + '&pageSize=100&areaCode=12&areaCode=48&areaCode=262&areaCode=818&areaCode=364&areaCode=368&areaCode=400&areaCode=414&areaCode=422&areaCode=434&areaCode=478&areaCode=504&areaCode=275&areaCode=634&areaCode=682&areaCode=706&areaCode=729&areaCode=760&areaCode=788&areaCode=732&areaCode=887&areaCode=15&areaCode=2&areaCode=1&areaCode=145&areaCode=840&areaCode=156' // заглушка із регіоном

    d3.json(url, function(test) {
        console.log(test.totalElements)
        if (+test.totalElements <= 100) {
            console.log("test.totalElements <= 100")
        } else {
            var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Series/Data?seriesCode=' + btn.value + '&pageSize=' + test.totalElements + '&areaCode=12&areaCode=48&areaCode=262&areaCode=818&areaCode=364&areaCode=368&areaCode=400&areaCode=414&areaCode=422&areaCode=434&areaCode=478&areaCode=504&areaCode=275&areaCode=634&areaCode=682&areaCode=706&areaCode=729&areaCode=760&areaCode=788&areaCode=732&areaCode=887&areaCode=15&areaCode=2&areaCode=1&areaCode=145&areaCode=840&areaCode=156'
        }


        d3.json(url, function(json) {
            console.log(url)
            var data = []
            var dimentionsDict = []
            var listOfKeys = []
            var dimentionsDict_2 = []
                // для кожного запису в таблиці із даними

            //console.log(json)
            var list = document.getElementById('countriesSelector')
            try {
                while (list.firstChild) {
                    list.removeChild(list.lastChild);
                }
            } catch {}

            var countryList = []
            var countryUnique = []

            // console.log(json)

            json.data.forEach(function(d) {
                if (d.value == "NaN" || d.value == 0 || d.value == Boolean || d.value == null || d.value == undefined || Number.isNaN(d.value)) {

                } else {
                    d.value = d.value.replace('<', '')
                    d.value = d.value.replace('>', '')
                    d.value = +d.value
                    if (countryUnique.includes(d.geoAreaName)) {} else {
                        countryUnique.push(d.geoAreaName)
                        geoAreaName = d.geoAreaName.replace('(', '')
                        geoAreaName = geoAreaName.replace(')', '')
                        geoAreaName = geoAreaName.replace(',', '')
                        geoAreaName = geoAreaName.replace('Iran Islamic Republic of', 'Iran')
                        geoAreaName = geoAreaName.replace('United States of America', 'USA')
                        geoAreaName = geoAreaName.replace('Syrian Arab Republic', 'Syria')

                        countryList.push({
                            geoAreaName: geoAreaName,
                            geoAreaCode: d.geoAreaCode
                        })
                    }
                    // date = d3.timeParse("%Y")(d.timePeriodStart)
                    date = d.timePeriodStart
                    data.push({
                        year: date,
                        value: d.value,
                        series: d.series,
                        seriesDescription: d.seriesDescription,
                        dimensions: d.dimensions,
                        country: geoAreaName,
                        geoAreaCode: d.geoAreaCode
                    })

                    singleDimention = ""
                    dimentionsList = []
                    for (const [key, value] of Object.entries(d.dimensions)) {
                        singleDimention = singleDimention + key + " : " + value + ', '
                        dimentionsList.push({
                            name: key,
                            value: value
                        })
                    }
                    if (listOfKeys.length != 0) {
                        if (listOfKeys.includes(singleDimention)) {} else {
                            listOfKeys.push(singleDimention)
                            dimentionsDict_2.push({
                                singleD: singleDimention.slice(0, -2),
                                listed: dimentionsList
                            })
                        }
                    } else {
                        listOfKeys.push(singleDimention)
                        dimentionsDict_2.push({
                            singleD: singleDimention.slice(0, -2),
                            listed: dimentionsList
                        })
                    }
                }
            })

            // console.log(dimentionsDict_2)


            menaCountries = [12, 48, 262, 818, 364, 368, 400, 414, 422, 434, 478, 504, 275, 634, 682, 706, 729, 760, 788]
            countryList.forEach(function(d) {
                //console.log(d)
                dv = document.createElement('div');
                opt = document.createElement('input');
                lab = document.createElement('label');
                opt.innerHTML = d.geoAreaName
                opt.value = d.geoAreaCode

                if (menaCountries.includes(+d.geoAreaCode)) {
                    opt.classList.add('menaCountry')
                } else {
                    opt.classList.add('benchmark')
                }
                opt.classList.add('custom-checkbox')
                opt.type = "checkbox"
                opt.name = "ck"
                ids = d.geoAreaName.toString()
                cids = ids.replace(/\s/g, '')
                opt.id = cids
                lab.for = d.geoAreaName
                lab.innerHTML = d.geoAreaName
                list.appendChild(dv)
                dv.appendChild(lab)
                dv.appendChild(opt)
            })


            var list = document.getElementById('dimentionSelectorBlock')
            try {
                while (list.firstChild) {
                    list.removeChild(list.lastChild);
                }
            } catch {}

            il = document.createElement('div');
            il.id = 'dimention_block'
            list.appendChild(il)
            var dimentionList = []

            dimentionsDict_2.forEach(function(d) {
                console.log(d)
                singleDimention = []
                    // singleDimention.push(d.listed)
                singleDimention.push(d.singleD)
                singleDimention.push(d.singleD)
                dimentionList.push(singleDimention)
            })

            dimentionsSelector = new CustomSelect('#dimention_block', {
                name: dimentionList[0][1],
                targetValue: dimentionList[0][0],
                options: dimentionList,
            })

            // var dimention_block = document.getElementById('dimention_block')
            // try {
            //     while (dimention_block.firstChild) {
            //         dimention_block.removeChild(dimention_block.lastChild);
            //     }
            // } catch {}

            // // dimentionList = []
            // dimentionsDict_2.forEach(function(d) {
            //     // singleDimention = []
            //     console.log(d)

            //     dim_option = document.createElement('option');
            //     dim_option.innerHTML = d.singleD
            //     dim_option.data = d.listed
            //     dimention_block.appendChild(dim_option)
            // })


            menaSelect()
            getLineChart(data, countryList)
        })
    })
}

document.querySelector('#seriesSelector').addEventListener('select.change', (e) => {
    const btn = e.target.querySelector('.select__toggle');
    // console.log(btn)
    // выбранное значение
    console.log(`Выбранное значение: ${btn.value}`);
    // индекс выбранной опции
    const selected = e.target.querySelector('.select__option_selected');
    // console.log(selected)
    const text = selected ? selected.textContent : '';
    // console.log(`Выбранный текст опции: ${text}`);
    downloadData()
})


function listOfSeries(option) {
    console.log(option)

    function update(option) {
        console.log(option)
        var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Indicator/' + option + '/Series/List'
        console.log(url)
        d3.json(url, function(error, json) {
            if (error) return console.warn(error);

            var list = document.getElementById('seriesSelectorBlock')
            try {
                while (list.firstChild) {
                    list.removeChild(list.lastChild);
                }
            } catch {}
            il = document.createElement('div');
            il.id = 'seriesSelector'
            list.appendChild(il)
            var seriesList = []
            json[0].series.forEach(function(d) {
                singleSeries = []
                singleSeries.push(d.code)
                singleSeries.push(d.description)
                seriesList.push(singleSeries)
            })
            seriesSelector = new CustomSelect('#seriesSelector', {
                name: seriesList[0][1],
                targetValue: seriesList[0][0],
                options: seriesList,
            });
            downloadData()
        });
    }
    update(option)
    document.querySelector('#indicatorsList').addEventListener('select.change', (e) => {
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

function listOfIndicators(option) {

    function update(option) {

        var url = 'https://unstats.un.org/SDGAPI/v1/sdg/Indicator/List'
            //console.log(url)
        d3.json(url, function(error, json) {
            if (error) return console.warn(error);
            //console.log(json)

            var list = document.getElementById('indicatorsListBlock')
            try {
                while (list.firstChild) {
                    list.removeChild(list.lastChild);
                }
            } catch {}
            il = document.createElement('div');
            il.id = 'indicatorsList'
            list.appendChild(il)
            var indicatorsList = []
            json.forEach(function(d) {
                // console.log(json)
                if (d.target === option) {
                    console.log(d)
                    var singleIndicator = []
                    singleIndicator.push(d.code)
                    singleIndicator.push(d.description)
                    indicatorsList.push(singleIndicator)
                } else {}
            })
            indicatorsSelector = new CustomSelect('#indicatorsList', {
                name: indicatorsList[0][1],
                targetValue: indicatorsList[0][0],
                options: indicatorsList,
            });
            console.log(indicatorsList[0][1])
            console.log(indicatorsList[0][0])
            listOfSeries(indicatorsList[0][0])

        });
    }
    update(option)

    document.querySelector('#targetsSelector').addEventListener('select.change', (e) => {
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

function listOfTargets(option) {
    console.log("listOfTargets() ")

    function update(option) {

        var url = ' https://unstats.un.org/SDGAPI/v1/sdg/Goal/' + option + '/Target/List?includechildren=true'
        console.log(url)
        d3.json(url, function(error, json) {
            if (error) return console.warn(error);
            var list = document.getElementById('targetsSelectorBlock')
            try {
                while (list.firstChild) {
                    list.removeChild(list.lastChild);
                }
            } catch {}
            ts = document.createElement('div');
            ts.id = 'targetsSelector'
            list.appendChild(ts)

            targetsList = []
            json[0].targets.forEach(function(d) {
                singleTarget = []
                singleTarget.push(d.code)
                singleTarget.push(d.description)
                targetsList.push(singleTarget)
            })
            targetsSelector = new CustomSelect('#targetsSelector', {
                name: targetsList[0][1],
                targetValue: targetsList[0][0],
                options: targetsList,
            });
            // console.log(list.firstChild.value)
            listOfIndicators(targetsList[0][0])
        });
    }
    update(option)

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
        goalImage = document.getElementById('goalImage')
        goalImage.src = '/pic/E Inverted Icons_WEB-0' + btn.value + '.png'
        update(btn.value)
    });
}

function listOfGoals() {
    goalsShortNameList = [
        [8, 'GOAL 8: Decent Work and Economic Growth'],
        [1, 'GOAL 1: No Poverty'],
        [2, 'GOAL 2: Zero Hunger'],
        [3, 'GOAL 3: Good Health and Well-being'],
        [4, 'GOAL 4: Quality Education'],
        [5, 'GOAL 5: Gender Equality'],
        [6, 'GOAL 6: Clean Water and Sanitation'],
        [7, 'GOAL 7: Affordable and Clean Energy'],
        [9, 'GOAL 9: Industry, Innovation and Infrastructure'],
        [10, 'GOAL 10: Reduced Inequality'],
        [11, 'GOAL 11: Sustainable Cities and Communities'],
        [12, 'GOAL 12: Responsible Consumption and Production'],
        [13, 'GOAL 13: Climate Action'],
        [14, 'GOAL 14: Life Below Water'],
        [15, 'GOAL 15: Life on Land'],
        [16, 'GOAL 16: Peace and Justice Strong Institutions'],
        [17, 'GOAL 17: Partnerships to achieve the Goal]']
    ]
    goalsSelector = new CustomSelect('#goalsSelector', {
        name: goalsShortNameList[0][1],
        targetValue: goalsShortNameList[0][0],
        options: goalsShortNameList,
    });
    listOfTargets(goalsShortNameList[0][0])
        // console.log(GoalsList[0][0])
}
listOfGoals()