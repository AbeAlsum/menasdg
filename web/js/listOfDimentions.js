function listOfDimentions() {

    var indicator = d3.select("#seriesSelector").property("value")
    var dimentionsList = []
    var dimentionsDict = []




    var dimention_block = document.getElementById('dimention_block')
        //console.log(dimentions)
    try {
        while (dimention_block.firstChild) {
            dimention_block.removeChild(dimention_block.lastChild);
        }
    } catch {}

    dimentions_url = "https://unstats.un.org/SDGAPI/v1/sdg/Series/" + indicator + "/Dimensions"
    d3.json(dimentions_url, function(dimentions) {
        dimentions.forEach(function(d) {
            dim = document.createElement('select');
            dimention_block.appendChild(dim)
            ids = d.id.toString()
            cids = ids.replace(/\s/g, '')
            dim.setAttribute('id', cids)
            dimentionsList.push(cids)
            d.codes.forEach(function(dc) {
                dim_option = document.createElement('option');
                dim_option.innerHTML = dc.description
                dim_option.value = dc.code

                dim.appendChild(dim_option)
            })

        });
        dim.addEventListener('click', (event) => {
            getGraphs(dimentionsList)
        })
    })

    //console.log(dimentionsList)
    // dimentionsList.forEach(function(d) {
    //     //var val = d3.select(d).property("value")
    //     console.log(d)
    // })


    // attribute_url = "https://unstats.un.org/SDGAPI/v1/sdg/Series/" + indicator + "/Attributes"

    // attribute_block = document.getElementById('attribute_block')
    // try {
    //     while (attribute_block.firstChild) {
    //         attribute_block.removeChild(attribute_block.lastChild);
    //     }
    // } catch {}

    // d3.json(attribute_url, function(attribute) {
    //     //console.log(attribute)
    //     attribute.forEach(function(d) {
    //         attr = document.createElement('select');
    //         attribute_block.appendChild(attr)
    //             // console.log(d)
    //             // console.log(d.id)
    //             // console.log(d.codes)
    //         d.codes.forEach(function(dc) {
    //             attr_option = document.createElement('option');
    //             attr_option.innerHTML = dc.description
    //             attr_option.value = dc.code
    //             attr.classList.add(d.id)
    //             attr.appendChild(attr_option)
    //         })
    //     });


    // })
    console.log(dimentionsDict)

}

d3.select("#countriesSelector").on("change.series_2List", function() {
    listOfDimentions()
})