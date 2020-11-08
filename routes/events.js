const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Event = require('../controller/events-control');
// =========================
const Filter = require('../controller/events-filter');


router.get('/upcoming', Event.getUpcomingEvents);

router.get('/near-you', Event.getNearyouEvents);




router.get('/filter', async (req, res) => {
    let from, to, popularity, eventType, data;

    const query = req.query;
    popularity = query.popularity;
    eventType = query.event_type;
    // console.log(eventType);

    if (query.from != "" & query.to != "") {
        from = "&datetime_utc.gte=" + query.from;
        to = "&datetime_utc.lte=" + query.to;
    } else {
        from = "";
        to = "";
    }

    const newapi = "https://api.seatgeek.com/2/events?" + from + to + "&client_id=MjEzNjIzNTl8MTYwMzM3ODg3OS42NDc4ODU2&per_page=500";
    const response = await fetch(newapi);
    data = await response.json();
    data = data.events;

    // =========== FILTER ==========
    if (popularity != "") {
        data = Filter.popularityFilter(data);
    }

    if(eventType != "") {
        data = Filter.typeFilter(data, eventType);
    }


    res.render('pages/upcoming_events', {
        data: data,
        user: false
    })

});




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

router.get('/search/:value', Event.getSearchResults);


router.get('/artist=:artist_id', Event.getArtistsEvents);

module.exports = router;