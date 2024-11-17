const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector(".form");

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

//Reset tài khoản khi đăng xuất
const log_out = document.querySelector(".log-out");
log_out.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("LoginUser");
  const nav__login = document.querySelector("#navbar__login");
  nav__login.href = "./login.html";
  nav__login.classList.remove("navbar__login");
  const navbar__loginDesc = document.querySelector("#navbar__login-desc");
  navbar__loginDesc.textContent = "Đăng nhập"; // Xóa tên người dùng
  navbar__loginDesc.classList.remove("navbar__item-desc-active");
  const navbar__login_block = document.querySelector(".navbar__login-block");
  navbar__login_block.classList.remove("navbar__login-block-active");
});

//Kiểm tra đăng nhập
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let flag = false; // Biến để kiểm tra nếu đăng nhập thành công
  let name;
  const accArray = JSON.parse(localStorage.getItem("accArray"));
  accArray.forEach((singleArray) => {
    if (
      singleArray.email === email.value &&
      singleArray.password === password.value
    ) {
      flag = true; // Cập nhật flag khi đăng nhập thành công
      name = singleArray.name; // Lấy tên người dùng để hiển thị trên navigation bar
      localStorage.setItem("LoginUser", JSON.stringify(singleArray));
    }
  });

  if (flag) {
    alert("Đăng nhập thành công.");
    const nav__login = document.querySelector("#navbar__login");
    nav__login.classList.add("navbar__login");
    const navbar__loginDesc = document.querySelector("#navbar__login-desc");
    navbar__loginDesc.textContent = name; // Sử dụng thuộc tính name
    navbar__loginDesc.classList.add("navbar__item-desc-active");
    const navbar__login_block = document.querySelector(".navbar__login-block");
    navbar__login_block.classList.add("navbar__login-block-active");
    window.location.href = "./index.html";
  } else alert("Tài khoản hoặc mật khẩu không đúng.");
});
