document.addEventListener("DOMContentLoaded", (e) => {
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const form = document.querySelector(".form");

  //Kiểm tra đăng nhập
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let flag = false; // Biến để kiểm tra nếu đăng nhập thành công
    let name;
    const accArray = JSON.parse(localStorage.getItem("accArray"));
    accArray.forEach((singleArray) => {
      if (
        singleArray.email === email.value &&
        singleArray.password === password.value &&
        singleArray.role === "admin"
      ) {
        flag = true;
        localStorage.setItem("LoginUser", JSON.stringify(singleArray));
      }
    });

    if (flag) {
      alert("Đăng nhập thành công.");
      window.location.href = "index.html"; // Chuyển hướng đến trang quản lý admin
    } else {
      alert("Tài khoản hoặc mật khẩu không chính xác.");
    }
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
});
