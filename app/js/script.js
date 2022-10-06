const navigationMenu = document.querySelector(".navbar__menu");
const navToggle = document.querySelector(".navbar__bars");

let resizeTimer;

const toggleAcions = () => {
  const visibility = navigationMenu.getAttribute("data-visible");

  if (visibility === "false") {
    navigationMenu.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
    return (navToggle.innerHTML = `<i class="fa-solid fa-xmark" ></i>`);
  } else {
    navigationMenu.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
    return (navToggle.innerHTML = `<i class="fa-solid fa-bars"></i>`);
  }
};

const preventUnwantedTransitions = () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
};

navToggle.addEventListener("click", toggleAcions);
window.addEventListener("resize", preventUnwantedTransitions);
