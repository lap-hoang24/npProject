const RequestIp = require('@supercharge/request-ip');
const fetch = require('node-fetch');
const apifetch = require('../controller/api');


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
    ip = RequestIp.getClientIp(req)
    api = "https://api.songkick.com/api/3.0/events.json?location=ip:" + ip;
    apiKey = "&apikey=iQvmMn3zAKS85ja5";
    perPage = "40";

    response = await fetch(api + apiKey);
    data = await response.json();
    data = data.resultsPage.results.event;
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
    const query = "&query=" + req.params.value;



    let artist = await apifetch.getData(api, apiKey);

    // console.log(query)
    // const response = await fetch(api + apiKey + query);
    // let data = await response.json();
    artist = artist.resultsPage.results.artist;
    // console.log(data);

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

    const response = await fetch(api + apiKey);
    let data = await response.json();
    // console.log(artist_id);
    data = data.resultsPage.results.event;

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