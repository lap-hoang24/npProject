

const UIController = (function () {

   const DOMstrings = {
      class: {
         artistLink: "artist-link",
         tourStatus: "tour-status",
         onTour: "on-tour",
         dateTime: "date_time",
         day: "day",
         month: "month",
         toggleButton: "toggle_button",
         navbarLink: "navbar_links",
         active: "hamburger-active",
         eventName: "event_name",
         upcomingEventLink: "upcoming-event_link",
         nearyouEventLink: "nearyou-event_link",
         navBar: "navbar",
         liveDot: "live-dot"
      },

      id: {
         searchInput: "search-input",
         searchForm: "search-form",
      },

      attr: {
         tourStatus: "tour-status",
         eventName: "event_name",
         dateTime: "date-time"
      }
   }

   return {
      // =========== SHOW TOUR STATUS FUNCTION / artist search page ==============

      addOnTour: () => {

         const tourStatus = document.getElementsByClassName(DOMstrings.class.artistLink);
         const tourStatusSpan = document.getElementsByClassName(DOMstrings.class.tourStatus);

         for (let i = 0; i < tourStatus.length; i++) {
            if (tourStatus[i].getAttribute(DOMstrings.attr.tourStatus) != "") {
               tourStatusSpan[i].innerHTML = "on tour";
               tourStatusSpan[i].classList.add(DOMstrings.class.onTour);
            }
         }
      },


      // ========= DISPLAY DATE - TIME // upcoming and near you pages ==================

      showDateTime: () => {
         let dateTime, months, dayDiv, monthDiv;

         dateTime = document.getElementsByClassName(DOMstrings.class.dateTime);
         dayDiv = document.getElementsByClassName(DOMstrings.class.day);
         monthDiv = document.getElementsByClassName(DOMstrings.class.month);

         months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

         for (let i = 0; i < dateTime.length; i++) {
            let dateTimeValue, month, day;

            dateTimeValue = dateTime[i].getAttribute(DOMstrings.attr.dateTime);
            day = dateTimeValue.slice(8, 10);
            month = dateTimeValue.slice(5, 7);
            month = months[month - 1];

            dayDiv[i].innerHTML = day;
            monthDiv[i].innerHTML = month
         }
      },

      // ======== REMOVE DATE TIME FROM NEAR YOU PAGE ====================

      removeDateTime: () => {

         const eventNameClass = document.getElementsByClassName(DOMstrings.class.eventName);
         const eventLinkClass = document.getElementsByClassName(DOMstrings.class.nearyouEventLink);

         for (let i = 0; i < eventNameClass.length; i++) {
            let newEventName;
            let eventName = eventNameClass[i].getAttribute(DOMstrings.attr.eventName);

            console.log(eventName.slice(-12));

            if (eventName.slice(-12) == "(CANCELLED) ") {
               newEventName = eventName.slice(0, -32);
            } else {
               newEventName = eventName.slice(0, -19);
            }

            eventLinkClass[i].innerHTML = newEventName;
         }

      },

      // ========= NAV BAR SCROLLING EFFECT ============

      navbarScroll: () => {
         const myNav = document.getElementsByClassName(DOMstrings.class.navBar)[0];
         const header = document.getElementsByTagName('header')[0];

         window.onscroll = function () {
            const top = window.scrollY;
            //  console.log(top);
            if (top > 100) {
               myNav.classList.add("actived");
               header.style.top = "0rem";
            }
            else {
               header.style.top = '1rem';
               myNav.classList.remove("actived");
            }
         };
      },

      getDOMstrings: function () {
         return DOMstrings;
      }
   }
})();


const appController = ((UICtrl) => {
   // Import all DOM strings from UIController

   const DOM = UICtrl.getDOMstrings();

   // Declare controller local variables

   let hamburgerButton, searchButton;

   hamburgerButton = document.getElementsByClassName(DOM.class.toggleButton)[0];
   searchButton = document.getElementById('search-input');

   // setting up all events listeners of web app

   const setupEventListeners = () => {
      hamburgerButton.addEventListener('click', hamburgerEvent);
      searchButton.addEventListener('keypress', searchEvent);
   }


   //App Controller functions =============

   // Hamburger menu event

   const hamburgerEvent = () => {
      const navLinks = document.getElementsByClassName(DOM.class.navbarLink)[0];
      navLinks.classList.toggle(DOM.class.active);
   }
   // Search bar event

   const searchEvent = (event) => {
      if (event.code == 'Enter') {
         const form = document.getElementById(DOM.id.searchForm);
         const searchQuery = document.getElementById(DOM.id.searchInput).value;

         let url = "/events/search/" + searchQuery;
         console.log(url);
         form.method = "get";
         form.action = url;
      }
   }

   // App Initialization===========
   return {
      init: () => {
         console.log('App started');

         UICtrl.navbarScroll();
         UICtrl.showDateTime();
         UICtrl.addOnTour();
         // UICtrl.removeDateTime();

         setupEventListeners();
      }
   }

})(UIController)


appController.init();




