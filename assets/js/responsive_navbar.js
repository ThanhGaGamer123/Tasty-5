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

const re_login = document.querySelector(".re-login");
const re_login__desc = document.querySelector(".re-login__desc");
const re_person = document.querySelector(".re-person");
const re_mycart = document.querySelector(".re-mycart");
const re_logout = document.querySelector(".re-logout");
// Tự động đăng nhập
window.addEventListener("load", (e) => {
  e.preventDefault();
  const loginUser = JSON.parse(localStorage.getItem("LoginUser"));
  if (loginUser) {
    re_login.href = "#!";
    re_login__desc.textContent = loginUser.name;
    re_person.classList.add("re-person-active");
    re_mycart.classList.add("re-mycart-active");
    re_logout.classList.add("re-logout-active");
  }
});

// Tự động đăng xuất
re_logout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("LoginUser");
  re_login.href = "./login.html";
  re_login__desc.textContent = "Đăng nhập";
  re_person.classList.remove("re-person-active");
  re_mycart.classList.remove("re-mycart-active");
  re_logout.classList.remove("re-logout-active");
  window.location.href = "./login.html";
});
