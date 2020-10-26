// const { default: fetch } = require("node-fetch");

const searchButton = document.getElementById('search');

searchButton.addEventListener('keypress', async (event) => {

    if(event.code == 'Enter') {
        event.preventDefault();
        try {
            const result = document.getElementById('search_results');

            const query = event.target.value;

            const api = "https://api.seatgeek.com/2/performers?q="
            const client_id = '&client_id=MjEzNjIzNTl8MTYwMzM3ODg3OS42NDc4ODU2';
        
            const response = await fetch(api + query + "&per_page=5" + client_id, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await response.json();
            result.classList.add('result');
            console.log(data);
        } catch (err) {
            console.error(err)
        }
    }

})