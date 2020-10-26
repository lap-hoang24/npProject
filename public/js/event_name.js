

let eventNameClass = document.getElementsByClassName('event_name');
let eventLinkClass = document.getElementsByClassName('event_link');
for (let i = 0; i < eventNameClass.length; i++) {
    let newEventName;
    let eventName = eventNameClass[i].getAttribute('event_name');

    console.log(eventName.slice(-12));

    if (eventName.slice(-12) == "(CANCELLED) ") {
        newEventName = eventName.slice(0, -32);
    } else {
        newEventName = eventName.slice(0, -19);
    }
    
    eventLinkClass[i].innerHTML = newEventName;
}