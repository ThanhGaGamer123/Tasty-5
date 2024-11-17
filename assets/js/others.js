//Tự động đăng nhập lại khi tải lại trang
window.addEventListener("load", (e) => {
  const loginUser = JSON.parse(localStorage.getItem("LoginUser"));
  if (loginUser) {
    const nav__login = document.querySelector("#navbar__login");
    nav__login.href = "#!";
    nav__login.classList.add("navbar__login");
    const navbar__loginDesc = document.querySelector("#navbar__login-desc");
    navbar__loginDesc.textContent = loginUser.name; // Sử dụng thuộc tính name
    navbar__loginDesc.classList.add("navbar__item-desc-active");
    const navbar__login_block = document.querySelector(".navbar__login-block");
    navbar__login_block.classList.add("navbar__login-block-active");
  }
});

// Chuyển hướng tới person-info và my-cart
const person_info = document.querySelector("#person-info");
person_info.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "./person_info.html";
});

const my_cart = document.querySelector("#my-cart");
my_cart.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "./my_cart.html";
});
