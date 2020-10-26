
let dateTime, months, dayDiv, monthDiv;

dateTime = document.getElementsByClassName('date_time');
dayDiv = document.getElementsByClassName('day');
monthDiv = document.getElementsByClassName('month');
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

for (let i = 0; i < dateTime.length; i++) {
    let dateTimeValue, month, day;

    dateTimeValue = dateTime[i].getAttribute('date-time');
    day = dateTimeValue.slice(8,10);
    month = dateTimeValue.slice(5, 7);
    month = months[month - 1];

    dayDiv[i].innerHTML = day;
    monthDiv[i].innerHTML = month
}



