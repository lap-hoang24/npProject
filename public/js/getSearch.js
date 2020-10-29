

const searchButton = document.getElementById('search-input');

searchButton.addEventListener('keypress', (event) => {

    if (event.code == 'Enter') {
        // event.preventDefault();

        const form = document.getElementById('search-form');
        const value = document.getElementById('search-input').value;

        let url = "/events/search/" + value;
        console.log(url);
        form.method = "get";
        form.action = url;
    
    }
})