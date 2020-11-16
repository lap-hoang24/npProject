

M.AutoInit();

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
});


    
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems, {
    dist: 0,
    padding: 20,
    fullWidth: false,
    indicators: true,
    duration: 100,
    autoplay: true
  });


  // custom function for autoplaying 
  let indicatorItems = document.querySelectorAll('.carousel .indicator-item'),
      slideTime = 4000,
      activeClass = "active";

  setInterval(() => {
    indicatorItems.forEach(el => {
      if (el.classList.contains(activeClass)) {
        sib = el.nextElementSibling;
        if (sib == null) {
          indicatorItems[0].click();
        } else {
          sib.click()
        }
      }
    });
  }, slideTime);
  // var instance = M.Carousel.getInstance(elem);
  // instance.next(2);
});

