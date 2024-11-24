// Mở thanh menu khi click vào biểu tượng menu
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");
const navbar = document.querySelector(".navbar");
menu.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.classList.add("overlay-active");
  navbar.classList.add("navbar-active");
});

// Click ra ngoài hoặc nút exit
const exit = document.querySelector(".navbar__close");
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("overlay-active");
    navbar.classList.remove("navbar-active");
  }
});

exit.addEventListener("click", (e) => {
  if (e.target === exit) {
    overlay.classList.remove("overlay-active");
    navbar.classList.remove("navbar-active");
  }
});
