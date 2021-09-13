const express = require('express');
const router = express.Router();
const Event = require('../controller/events-control');
const checkAuthentication = require('../middlewares/auth');
const verifyToken = require('../middlewares/jwt-verifier');
// =========================


router.get('/upcoming', Event.getUpcomingEvents);

router.get('/hello', Event.getUpcomingEvents);

router.get('/near-you' , Event.getNearyouEvents);

router.get('/filter/', Event.getFilteredEvents);

router.get('/search/:value', Event.getSearchResults);

router.get('/artist=:artist_id', Event.getArtistsEvents);

router.get('/near-you/:city', Event.getNearyouLocations);

router.get('/live', Event.getLiveEvents);

router.get('/live/:event_id',checkAuthentication ,Event.getLiveEvent);


module.exports = router;