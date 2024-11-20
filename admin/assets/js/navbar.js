document.addEventListener("DOMContentLoaded", (e) => {
  let login__desc = document.querySelector(".login__desc");
  let other__logout = document.querySelector(".other__logout");

  //Kiểm tra tài khoản khi vào trang admin
  if (localStorage.getItem("LoginUser") != null) {
    const loginUser = JSON.parse(localStorage.getItem("LoginUser"));
    if (loginUser.role === "admin") {
      //Tự động đăng nhập nếu đúng là tài khoản admin
      login__desc.textContent = loginUser.name;
      other__logout.style.display = "flex";
    } else {
      window.location.href = "./login.html";
    }
  } else {
    window.location.href = "./login.html";
  }

  //Reset tài khoản khi đăng xuất
  other__logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("LoginUser");
    window.location.href = "./login.html";
  });
});
