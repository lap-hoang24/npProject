const express = require('express');
const router = express.Router();
const RequestIp = require('@supercharge/request-ip')
const fetch = require('node-fetch');

// =========================

//Bring in COMMENT Model

const Comment = require('../models/Comments');

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


router.get('/comment', (req, res) => {
    console.log(req.user);
    res.render('comment', {
        errors: false
    })
})
router.post('/comment', (req, res) => {
    let comment = new Comment();

    comment.user_id = req.user._id;
    comment.content = req.body.content;

    comment.save((err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(req.body);
            req.flash('success', 'comment posted');
            res.redirect('/');
        }
    })
})

router.get('/search/:value', async (req, res) => {

    const api = "https://api.seatgeek.com/2/performers?q="
    const client_id = '&client_id=MjEzNjIzNTl8MTYwMzM3ODg3OS42NDc4ODU2';
    const query = req.params.value;

    console.log(query)
    const response = await fetch(api + query + "&per_page=50" + client_id)
    let data = await response.json();
    data = data.performers;
    // console.log(data);

    try {
        res.render('search', {
            data: data
        })
    } catch (err) {
        console.log(err);
    }

} )





module.exports = router;