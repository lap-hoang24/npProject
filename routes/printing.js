const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/shit', async (req, res) => {
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
})

router.get('/test', (req, res) => {
res.send("printing test");
})


module.exports = router;