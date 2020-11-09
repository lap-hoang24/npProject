const RequestIp = require('@supercharge/request-ip');
const fetch = require('node-fetch');
const apifetch = require('../controller/api');
const Filter = require('../controller/events-filter');

exports.getUpcomingEvents = async (req, res) => {
    try {
        const api = "https://api.seatgeek.com/2/events?taxonomies.name=concert&";
        const apiKey = "client_id=MjEzNjIzNTl8MTYwMzM3ODg3OS42NDc4ODU2&per_page=";
        const perPage = "100"

        const response = await fetch(api + apiKey + perPage);
        let data = await response.json();
        data = data.events;


        res.render('pages/upcoming_events', {
            data: data
        })



    } catch (err) {
        console.log(err);
    }
}


exports.getNearyouEvents = async (req, res) => {
    let ip, api, apiKey, perPage, response, data;
    let myIp = "87.65.73.133";
    let london = "167.98.119.77";
    let madrid = "84.236.185.247";
    let paris = "92.222.107.29"
    let barcelona = "91.126.239.175";
    let franfurt = "165.227.173.87";
    let rome = "45.139.28.80";
    let armsterdam = "37.139.4.138";
    let lisbon = "188.93.238.29"
    let tokyo = "198.13.63.193";
    let california = "50.247.72.33";
    ip = RequestIp.getClientIp(req)
    api = "https://api.songkick.com/api/3.0/events.json?location=ip:" + california;
    apiKey = "&apikey=iQvmMn3zAKS85ja5";
    perPage = "40";

    response = await fetch(api + apiKey);
    data = await response.json();
    data = data.resultsPage.results.event;

    console.log(data[0]);
    try {
        res.render('pages/near_you', {
            data: data
        })
    } catch (err) {
        console.log(err);
    }
}


exports.getSearchResults = async (req, res) => {

    const api = "https://api.songkick.com/api/3.0/search/artists.json?"
    const apiKey = 'apikey=iQvmMn3zAKS85ja5&query=' + req.params.value;
    let artist = await apifetch.getData(api, apiKey);
    console.log(artist);
    artist = artist.resultsPage.results.artist;

    try {
        res.render('pages/search_results', {
            data: artist
        })
    } catch (err) {
        console.log(err);
    }
}

exports.getArtistsEvents = async (req, res) => {
    const artist_id = req.params.artist_id;
    const api = "https://api.songkick.com/api/3.0/artists/" + artist_id + "/calendar.json?"
    const apiKey = 'apikey=iQvmMn3zAKS85ja5';

    let events = await apifetch.getData(api, apiKey);
    data = events.resultsPage.results.event;

    const apiPast = "https://api.songkick.com/api/3.0/artists/" + artist_id +" /gigography.json?apikey=iQvmMn3zAKS85ja5&min_date=2016-01-01&order=desc";
    const responsePast = await fetch(apiPast);
    let dataPast = await responsePast.json();
    dataPast = dataPast.resultsPage.results.event;

    try {
        res.render('pages/artist_events', {
            data: data,
            dataPast: dataPast
        })
    } catch (err) {
        console.log(err);
    }
}


exports.getFilteredEvents = async (req, res) => {
    let from, to, popularity, eventType, state,api, apiKey, data;

    const query = req.query;
    popularity = query.popularity;
    eventType = query.event_type;
    state = query.state;

    if (query.from != "" & query.to != "") {
        from = "&datetime_utc.gte=" + query.from;
        to = "&datetime_utc.lte=" + query.to;
    } else {
        from = "";
        to = "";
    }

    api = "https://api.seatgeek.com/2/events?" + from + to + "&per_page=200";
    apiKey = "&client_id=MjEzNjIzNTl8MTYwMzM3ODg3OS42NDc4ODU2";
    let events = await apifetch.getData(api, apiKey);
    data = events.events;

    // =========== FILTER ==========
    if (popularity != "") {
        data = Filter.popularityFilter(data);
    }

    if(eventType != "") {
        data = Filter.typeFilter(data, eventType);
    }

    if(state != "") {
        data = Filter.stateFilter(data, state);
    }

    res.render('pages/upcoming_events', {
        data: data,
        user: false
    })
}