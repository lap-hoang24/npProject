

filterButton = document.getElementsByClassName('city-filter');

for (let i = 0; i < filterButton.length; i++) {
    filterButton[i].addEventListener('click', (event) => {
        const ip = event.target.getAttribute('ip');
        console.log(ip);

        fetch("/events/near-you/filter/" + ip, {
            method: "POST"
            // headers: { 'Content-Type': 'application/json' }
        }).then(res => {if (res.ok) return res.json()})
        .then(data => console.log(data))
        .catch(err => console.error(err))
    })
}

