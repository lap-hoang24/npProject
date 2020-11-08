

filterButton  = document.getElementById('filternow');

filterButton.addEventListener('click', async (event) => {
    // event.preventDefault();
    const from = document.getElementById('fromdate').value;
    const to = document.getElementById('todate').value;

    
    const res = await fetch("https://api.seatgeek.com/2/events?datetime_utc.gte=" + from + "&datetime_utc.lte=" + to + "&client_id=MjEzNjIzNTl8MTYwMzM3ODg3OS42NDc4ODU2&per_page=1");

    let data = await res.json();

    data = data.events;

    console.log(data);

    // fetch("/events/filter/", {
    //     method: "POST",
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         data: data
    //     })
    // }).then(res => {
    //     if (res.ok) return res.json()
    // }).then(data => console.log(data)).catch(err => console.error(err));

    
})