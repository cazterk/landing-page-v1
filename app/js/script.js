const navigationMenu = document.querySelector(".navbar__menu");
const navToggle = document.querySelector(".navbar__bars");

navToggle.addEventListener("click", () => {
  const visibility = navigationMenu.getAttribute("data-visible");
  console.log(visibility);
  return visibility === "false"
    ? navigationMenu.setAttribute("data-visible", true)
    : navigationMenu.setAttribute("data-visible", false);

  //   return num > 0 ? "positive" : num < 0 ? "negative" : "zero";
});
