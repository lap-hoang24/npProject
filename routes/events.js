const express = require('express');
const router = express.Router();

const Event = require('../controller/events-control');
// =========================



router.get('/upcoming', Event.getUpcomingEvents);

router.get('/near-you', Event.getNearyouEvents);


// router.get('/comment', (req, res) => {
//     console.log(req.user);
//     res.render('comment', {
//         errors: false
//     })
// })
// router.post('/comment', (req, res) => {
//     let comment = new Comment();

//     comment.user_id = req.user._id;
//     comment.content = req.body.content;

//     comment.save((err) => {
//         if (err) {
//             console.log(err);
//             return;
//         } else {
//             console.log(req.body);
//             req.flash('success', 'comment posted');
//             res.redirect('/');
//         }
//     })
// })

router.get('/search/:value', Event.getSearchResults);


router.get('/artist=:artist_id', Event.getArtistsEvents);

module.exports = router;