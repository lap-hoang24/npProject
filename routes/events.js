const express = require('express');
const router = express.Router();
const Event = require('../controller/events-control');
const checkAuthentication = require('../middlewares/auth');
const verifyToken = require('../middlewares/jwt-verifier');
// =========================


router.get('/upcoming', Event.getUpcomingEvents);

router.get('/near-you',verifyToken , Event.getNearyouEvents);

router.get('/filter/', Event.getFilteredEvents);

router.get('/search/:value', Event.getSearchResults);

router.get('/artist=:artist_id', Event.getArtistsEvents);

router.get('/near-you/:city', checkAuthentication, Event.getNearyouLocations);

router.get('/live',checkAuthentication, Event.getLiveEvents);

router.get('/live/:event_id',checkAuthentication, Event.getLiveEvent);


module.exports = router;