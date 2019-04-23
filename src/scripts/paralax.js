"use strict";
(function() {
  let parallax = document.querySelector(".paralax-top");
  let layers = parallax.children;

  function scrollHandler(e) {
    Array.from(layers).forEach(element => {
      let speed = element.dataset.speed;
      if (window.innerWidth < 1300) speed = 0;
      let scrollY = e.currentTarget.pageYOffset;
      let strafe = (speed * scrollY) / 2;

      element.style.transform = `translateY(-${strafe}px)`;
    });
  }

  window.addEventListener("scroll", scrollHandler);
})();
