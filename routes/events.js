const express = require('express');
const router = express.Router();
const RequestIp = require('@supercharge/request-ip')
const fetch = require('node-fetch');

// =========================

router.get('/upcoming', async (req, res) => {
    try {
        const api = "https://api.seatgeek.com/2/events?taxonomies.name=concert&";
        const apiKey = "client_id=MjEzNjIzNTl8MTYwMzM3ODg3OS42NDc4ODU2&per_page=";
        const perPage = "40"

        const response = await fetch(api + apiKey + perPage);
        let data = await response.json();
        data = data.events;

        res.render('upcoming_events', {
            data: data
        })

    } catch (err) {
        console.log(err);
    }
})

router.get('/near-you', async (req, res) => {
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
        res.render('near_you', {
            data: data
        })
    } catch (err) {
        console.log(err);
    }
})





module.exports = router;