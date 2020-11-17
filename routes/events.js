const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Event = require('../controller/events-control');
// =========================



router.get('/upcoming', Event.getUpcomingEvents);

router.get('/near-you', Event.getNearyouEvents);

router.get('/filter/', Event.getFilteredEvents);

router.get('/search/:value', Event.getSearchResults);

router.get('/artist=:artist_id', Event.getArtistsEvents);

router.get('/near-you/:city', Event.getNearyouLocations);

module.exports = router;