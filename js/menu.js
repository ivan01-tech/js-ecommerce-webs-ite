let toogle = document.querySelector(".display-menu");
let menu = document.querySelector("#menu");
let divNav = document.querySelector("div-nav");
let isActive = false;
const handleClick = function () {
  menu.classList.toggle("active");
  // divNav.classList.toggle("active");
  if (menu.classList.contains("active")) {
    menu.style.animation = "translateBack 2s ease-in-out alternate both ;";
    isActive = true;
  } else {
    menu.style.animation = "translate 2s ease-in-out alternate both ;";
  }
};

toogle.addEventListener("click", handleClick);

window.addEventListener("scroll", () => {
  let fixedHead = document.getElementById("fixed-head");
  if (window.scrollY > 90) {
    fixedHead.classList.add("fixed");
  } else {
    fixedHead.classList.remove("fixed");
  }
});
