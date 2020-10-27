const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/search', async (req, res) => {
    let api = "https://api.seatgeek.com/2/performers?q="
    let search_query = req.body.search_query;
    let client_id = '&client_id=MjEzNjIzNTl8MTYwMzM3ODg3OS42NDc4ODU2';


    const response = await fetch(api + search_query + "&per_page=20" + client_id);

    const data = await response.json();

})


module.exports = router;
