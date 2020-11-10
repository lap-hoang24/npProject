const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Event = require('../controller/events-control');
// =========================



router.get('/upcoming', Event.getUpcomingEvents);

router.get('/near-you', Event.getNearyouEvents);

router.get('/filter', Event.getFilteredEvents);

router.get('/search/:value', Event.getSearchResults);

router.get('/artist=:artist_id', Event.getArtistsEvents);


// router.get('/near-you/filter/:ip', async (req, res) => {
//     ip = req.params.ip;
//     console.log(ip);

//     api = "https://api.songkick.com/api/3.0/events.json?location=ip:" + ip;
//     apiKey = "&apikey=iQvmMn3zAKS85ja5";
//     perPage = "40";

//     response = await fetch(api + apiKey);
//     data = await response.json();
//     data = data.resultsPage.results.event;

//     try {
//         res.render('pages/near_you', {
//             data: data
//         })
//     } catch (err) {
//         console.log(err);
//     }
// })

module.exports = router;