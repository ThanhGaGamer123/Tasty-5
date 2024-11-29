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

  const cartArray = JSON.parse(localStorage.getItem("cartArray"));

  if (loginUser && cartArray) {
    let flag = false;
    cartArray.forEach((singleArray) => {
      if (singleArray[0].email === loginUser.email) {
        console.log(singleArray[0].email);
        flag = true;
        localStorage.setItem("cart", JSON.stringify(singleArray));
      }
    });
    if (!flag) {
      const cart = [];
      cart.push(loginUser);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
});

//Reset tài khoản khi đăng xuất
const log_out = document.querySelector("#log_out");
log_out.addEventListener("click", (e) => {
  e.preventDefault();

  localStorage.removeItem("cart");

  localStorage.removeItem("LoginUser");
  const nav__login = document.querySelector("#navbar__login");
  nav__login.href = "./login.html";
  nav__login.classList.remove("navbar__login");
  const navbar__loginDesc = document.querySelector("#navbar__login-desc");
  navbar__loginDesc.textContent = "Đăng nhập"; // Xóa tên người dùng
  navbar__loginDesc.classList.remove("navbar__item-desc-active");
  const navbar__login_block = document.querySelector(".navbar__login-block");
  navbar__login_block.classList.remove("navbar__login-block-active");
  window.location.href = "./login.html"; // Chuyển hướng đến trang login.html
});

//Kiểm tra đăng nhập
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let flag = false; // Biến để kiểm tra nếu đăng nhập thành công
  let blocked_role = false;
  let name;
  const accArray = JSON.parse(localStorage.getItem("accArray"));
  accArray.forEach((singleArray) => {
    if (
      singleArray.email === email.value &&
      singleArray.password === password.value &&
      singleArray.role !== "customer-blocked"
    ) {
      flag = true; // Cập nhật flag khi đăng nhập thành công
      name = singleArray.name; // Lấy tên người dùng để hiển thị trên navigation bar
      localStorage.setItem("LoginUser", JSON.stringify(singleArray));
    } else if (singleArray.role === "customer-blocked") blocked_role = true;
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
  } else if (blocked_role) {
    alert(
      "Tài khoản của bạn đã bị KHÓA. Vui lòng liên hệ admin để biết thêm chi tiết"
    );
    window.location.href = "./login.html";
  } else alert("Tài khoản hoặc mật khẩu không đúng.");
});

//Show/Hide Code
let show__password = document.querySelector(".show__password");
let hidden__password = document.querySelector(".hidden__password");

show__password.addEventListener("click", (e) => {
  e.preventDefault();
  let password = document.querySelector("#password");
  password.type = "text";
  show__password.style.display = "none";
  hidden__password.style.display = "block";
});

hidden__password.addEventListener("click", (e) => {
  e.preventDefault();
  let password = document.querySelector("#password");
  password.type = "password";
  hidden__password.style.display = "none";
  show__password.style.display = "block";
});
