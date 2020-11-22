const RequestIp = require('@supercharge/request-ip');
const fetch = require('node-fetch');
const apifetch = require('../controller/api');
const Filter = require('../controller/events-filter');
const geoip = require('geoip-lite');

const Event = require('../models/Event');
const Comment = require('../models/Comments');

exports.getUpcomingEvents = async (req, res) => {
   try {
      const api = "https://api.seatgeek.com/2/events?";
      const apiKey = "client_id=MjEzNjIzNTl8MTYwMzM3ODg3OS42NDc4ODU2&per_page=";
      const perPage = "100"

      const response = await fetch(api + apiKey + perPage);
      let data = await response.json();
      data = data.events;

      res.render('pages/upcoming_events', { data })
   } catch (err) {
      console.log(err);
   }
}

exports.getNearyouLocations = async (req, res) => {

   const cities = {
      london: "167.98.119.77",
      madrid: "84.236.185.247",
      paris: "92.222.107.29",
      barcelona: "91.126.239.175",
      franfurt: "165.227.173.87",
      rome: "45.139.28.80",
      amsterdam: "37.139.4.138",
      lisbon: "188.93.238.29",
      tokyo: "198.13.63.193"
   }

   function getIp(city) {
      const index = Object.keys(cities).indexOf(city);
      return Object.values(cities)[index];
   }

   try {
      api = "https://api.songkick.com/api/3.0/events.json?location=ip:" + getIp(req.params.city);
      apiKey = "&apikey=iQvmMn3zAKS85ja5";
      perPage = "40";
      const location = req.params.city;

      response = await fetch(api + apiKey);
      data = await response.json();
      data = data.resultsPage.results.event;

      res.render('pages/near_you', { data, location })
   } catch (err) {
      console.log(err);
   }
}


exports.getNearyouEvents = async (req, res) => {

   let ip, api, apiKey, perPage, response, data;
   let myIp = "87.65.73.133";
   ip = RequestIp.getClientIp(req)

   const geo = geoip.lookup(myIp);

   
   try {
      api = "https://api.songkick.com/api/3.0/events.json?location=ip:" + ip;
      apiKey = "&apikey=iQvmMn3zAKS85ja5";
   
      response = await fetch(api + apiKey);
      data = await response.json();
      data = data.resultsPage.results.event;

      res.render('pages/near_you', { data, location: geo.city })
   } catch (err) {
      console.log(err);
   }
}


exports.getSearchResults = async (req, res) => {

   const api = "https://api.songkick.com/api/3.0/search/artists.json?"
   const apiKey = 'apikey=iQvmMn3zAKS85ja5&query=' + req.params.value;
   
   try {
      let artist = await apifetch.getData(api, apiKey);
      data = artist.resultsPage.results.artist;
      res.render('pages/search_results', { data })
   } catch (err) {
      console.log(err);
   }
}

exports.getArtistsEvents = async (req, res) => {
   const artist_id = req.params.artist_id;
   const api = "https://api.songkick.com/api/3.0/artists/" + artist_id + "/calendar.json?"
   const apiKey = 'apikey=iQvmMn3zAKS85ja5';
   const apiPast = "https://api.songkick.com/api/3.0/artists/" + artist_id + " /gigography.json?apikey=iQvmMn3zAKS85ja5&min_date=2016-01-01&order=desc";
   
   
   try {
      let events = await apifetch.getData(api, apiKey);
      data = events.resultsPage.results.event;
      
      const responsePast = await fetch(apiPast);
      let dataPast = await responsePast.json();
      dataPast = dataPast.resultsPage.results.event;

      res.render('pages/artist_events', { data, dataPast })
   } catch (err) {
      console.log(err);
   }
}


exports.getFilteredEvents = async (req, res) => {
   let from, to, popularity, eventType, state, api, apiKey, data;

   const query = req.query;

   popularity = query.popularity;
   state = query.state;


   if (query.event_type != "") {
      eventType = "taxonomies.name=" + query.event_type;
   } else {
      eventType = "";
   }

   if (query.from != "" & query.to != "") {
      from = "&datetime_utc.gte=" + query.from;
      to = "&datetime_utc.lte=" + query.to;
   } else {
      from = "";
      to = "";
   }

   api = "https://api.seatgeek.com/2/events?" + eventType + from + to + "&per_page=200";
   apiKey = "&client_id=MjEzNjIzNTl8MTYwMzM3ODg3OS42NDc4ODU2";
   let events = await apifetch.getData(api, apiKey);
   data = events.events;

   // =========== FILTER ==========
   if (popularity != "") {
      data = Filter.popularityFilter(data);
   }

   if (state != "") {
      data = Filter.stateFilter(data, state);
   }

   res.render('pages/upcoming_events', { data, user: false })
}


exports.getLiveEvents = async (req, res) => {
   try {
      let events = await Event.find({});

      res.render('pages/liveshows', { events })
   } catch (err) {
      console.error(err);
   }
}

exports.getLiveEvent = async (req, res) => {
   try {
      let event = await Event.findOne({ _id: req.params.event_id });
      let comments = await Comment.find({ liveshows_id: req.params.event_id });

      res.render('pages/one_live', { event, comments });
   } catch (err) {
      console.error(err);
   }
}


