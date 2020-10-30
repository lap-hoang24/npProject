
// =========== SHOW TOUR STATUS FUNCTION =================

(function () {

    const tourStatus = document.getElementsByClassName('artist-link');
    const tourStatusSpan = document.getElementsByClassName('tour-status');

    for (let i = 0; i < tourStatus.length; i++) {
        if (tourStatus[i].getAttribute('tour-status') != "") {
            tourStatusSpan[i].classList.add('on-tour')
        } else {
            tourStatusSpan[i].classList.add('off-tour')
        }
    }
})();


// =========== SEARCH FUNCTION ===================

(function () {
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

})();


// ========= SHOW DATE - TIME ===================


(function () {

    let dateTime, months, dayDiv, monthDiv;

    dateTime = document.getElementsByClassName('date_time');
    dayDiv = document.getElementsByClassName('day');
    monthDiv = document.getElementsByClassName('month');
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < dateTime.length; i++) {
        let dateTimeValue, month, day;

        dateTimeValue = dateTime[i].getAttribute('date-time');
        day = dateTimeValue.slice(8, 10);
        month = dateTimeValue.slice(5, 7);
        month = months[month - 1];

        dayDiv[i].innerHTML = day;
        monthDiv[i].innerHTML = month
    }
})();


// ====== HAMBURGER BUTTON CLICK EVENT =========================

(function () {
    const toggleButton = document.getElementsByClassName('toggle_button')[0];
    const navbarLinks = document.getElementsByClassName('navbar_links')[0];

    toggleButton.addEventListener('click', (event) => {
        navbarLinks.classList.toggle('active');
        console.log(event.target);
    })
})();


// ========= NAV BAR SCROLLING EFFECT ============

(function () {
    const logo = document.getElementsByClassName('brand_logo')[0];
    const myNav = document.getElementsByClassName('navbar')[0];
    const header = document.getElementsByTagName('header')[0];

    window.onscroll = function () {
        const top = window.scrollY;
        console.log(top);
        if (top > 100) {
            myNav.classList.add("active");
            header.style.top = "0rem";
            logo.classList.add('transform');
        }
        else {
            header.style.top = '1rem';
            myNav.classList.remove("active");
            logo.classList.remove('transform');
            logo.classList.add('reverse-transform')
        }
    };
})();
