"use strict";
(function() {
  let popup = document.querySelector(".popup");
  let close = document.querySelector(".popup__close");
  let open = document.querySelector(".header__link-menu");

  function popupOpenHandler(e) {
    e.preventDefault();

    popup.style.transform = `translateY(0)`;
  }

  open.addEventListener("click", popupOpenHandler);

  function popupCloseHandler(e) {
    e.preventDefault();

    popup.style.transform = ``;
  }

  close.addEventListener("click", popupCloseHandler);

  function popupHandler(e) {
    let parentLinkMenu = e.target.closest(".nav__item");
    let parentSocials = e.target.closest(".socials__item");
    let parentScroll = e.target.closest(".hero__bottom-buttons");
    let isVisible = popup.style.transform ? true : false;

    if (parentLinkMenu || parentScroll) {
      e.preventDefault();
    }

    if ((parentSocials || parentLinkMenu || parentScroll) && isVisible)
      popup.style.transform = ``;
  }

  document.body.addEventListener("click", popupHandler);
})();
