let toogle = document.querySelector(".display-menu");
let menu = document.querySelector("#menu");
let divNav = document.querySelector("div-nav");
const cartOverLay = document.querySelector('.cart-overlay')
let isActive = false;


const handleClick = function (e) {
  cartOverLay.classList.toggle('active')
  menu.classList.toggle("active");
  if (menu.classList.contains("active")) {
    menu.style.animation = "translateBack 2s ease-in-out alternate both ;";
    isActive = true;
    toogle.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>'
    toogle.style.color = 'brown'

  } else {
    menu.style.animation = "translate 2s ease-in-out alternate both ;";
    toogle.style.removeProperty('color')
    toogle.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>'

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


// Responsive
let uls = document.querySelectorAll('.drop-down-content')
let links = document.querySelectorAll('.drop-down-link')

links.forEach((link, ind) => {
  link.addEventListener('click', function () {
    if (link.classList.contains('is-open')) {
      link.classList.remove('is-open')
      uls[ind].classList.remove('is-open')
    } else {
      uls.forEach((ul) => {
        ul.classList.remove('is-open')
      })
      links.forEach((l) => {
        l.classList.remove('is-open')
      })
      uls[ind].classList.add('is-open')
      link.classList.add('is-open')
    }

  })
})
