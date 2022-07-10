// Welcome Message section
const changeTagOfFloatMessage = () => {
  let floatMessage = document.querySelector(".float-message");
  if (window.innerWidth <= 730) {
    floatMessage.innerHTML = "<marquee >Bienvenu sur e-Commerce !</marquee>";
    floatMessage.style.width = '50%'
  }
  if (window.innerWidth > 730) {
    floatMessage.innerHTML = "<span >Bienvenu sur e-Commerce !</span>";
    floatMessage.style.width = '70%'
  }
};

document.addEventListener("DOMContentLoaded", () => {
  changeTagOfFloatMessage();
});

window.addEventListener("resize", () => {
  changeTagOfFloatMessage();
});

//   End of changeTagOfFloatMessage
