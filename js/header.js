// Welcome Message section
const changeTagOfFloatMessage = () => {
  let floatMessage = document.querySelector(".float-message");
  if (window.innerWidth <= 730) {
    floatMessage.innerHTML = "<marquee >Bienvenu sur e-Shoes !</marquee>";
    floatMessage.style.width = '50%'
    // floatMessage.style.height = '10%'
  }
  if (window.innerWidth > 730) {
    floatMessage.innerHTML = "<span >Bienvenu sur e-Shoes ! Chez Nous Chez Nous</span>";
    floatMessage.style.width = '70%'
    // floatMessage.style.height = '10%'
  }
};

document.addEventListener("DOMContentLoaded", () => {
  changeTagOfFloatMessage();
});

window.addEventListener("resize", () => {
  changeTagOfFloatMessage();
});

//   End of changeTagOfFloatMessage
