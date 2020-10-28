
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