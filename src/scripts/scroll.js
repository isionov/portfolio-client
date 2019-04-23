"use strict";
(function() {
  const button = document.querySelector("#hero__scroll-button");
  const section = document.querySelector(".about");

  function clickHandler(e) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  button.addEventListener("click", clickHandler);

  const sections = document.querySelectorAll("section");
  const headerLinks = document.querySelectorAll("[href^='#section-']");
  const V = 1;

  for (const link of headerLinks) {
    link.addEventListener("click", function(e) {
      const hrefAttr = link.getAttribute("href");
      const className = hrefAttr.split("-");
      const section = document.querySelector(`section.${className[1]}`);
      const coordAnchor = section.getBoundingClientRect().top;
      const windowY = window.pageYOffset;
      let start = null;

      function step(time) {
        if (start === null) start = time;
        let progress = time - start;
        let coordY =
          coordAnchor < 0
            ? Math.max(windowY - progress / V, windowY + coordAnchor)
            : Math.min(windowY + progress / V, windowY + coordAnchor);

        window.scrollTo(0, coordY);
        if (coordY != windowY + coordAnchor) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    });
  }
})();
