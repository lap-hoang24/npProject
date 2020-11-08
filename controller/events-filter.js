exports.popularityFilter = (data) => {
    let events = [];
    let popularity = [];
    let popularitySorted = [];

    data.forEach((el) => {
        if (el.popularity > 0) {
            events.push(el);
            popularity.push(el.popularity);
        }
    })

    popularity.sort((a, b) => b - a);

    for (let i = 0; i < events.length; i++) {
        for (let j = 0; j < popularity.length; j++) {
            if (popularity[i] === events[j].popularity) {
                popularitySorted.push(events[j]);
            }
        }
    }
    data = popularitySorted;

    return data;
}

exports.typeFilter = (data, eventType) => {
    let typeSorted = [];

    data.filter((dataa) => {
        if (dataa.type === eventType) {
            typeSorted.push(dataa)
        }
    })
    // data.forEach((dataset) => {
    //     if(dataset.type === eventType) {
    //         typeSorted.push(dataset);
    //     }
    // })
    return typeSorted;
}


