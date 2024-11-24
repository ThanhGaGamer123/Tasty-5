// Mở thanh menu khi click vào biểu tượng menu
const navbar__menu = document.querySelector(".navbar__menu");
const overlay = document.querySelector(".overlay");
const re_navbar = document.querySelector(".re-navbar");
navbar__menu.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.classList.add("overlay-active");
  re_navbar.classList.add("re-navbar-active");
});

// Click ra ngoài hoặc nút exit
const exit = document.querySelector(".re-close");
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("overlay-active");
    re_navbar.classList.remove("re-navbar-active");
  }
});

exit.addEventListener("click", (e) => {
  if (e.target === exit) {
    overlay.classList.remove("overlay-active");
    re_navbar.classList.remove("re-navbar-active");
  }
});
