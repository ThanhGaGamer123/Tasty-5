//Chờ cho Web load xong nội dụng ròi mới add vào
document.addEventListener("DOMContentLoaded", () => {
  let accArray = JSON.parse(localStorage.getItem("accArray")) || [];
  let loginUser = JSON.parse(localStorage.getItem("LoginUser"));

  //Lấy username
  let username__input = document.querySelector(".username__input");
  username__input.value = loginUser.name;

  //Lấy password
  let password__input = document.querySelector(".password__input");

  //Lấy phone
  let phone__input = document.querySelector(".phone__input");
  phone__input.value = loginUser.phone;

  //Lấy địa chỉ
  let address__input = document.querySelector(".address__input");
  address__input.value = loginUser.address;

  // Thông báo khi người dùng nhập sai
  const wrongValue = document.createElement("span");
  wrongValue.classList.add("section-desc");
  wrongValue.classList.add("input__wrong");

  //kiểm tra số phone
  const form__phone = document.querySelector(".form__phone");
  let condition = true;
  phone__input.addEventListener("input", (e) => {
    if (isNaN(phone__input.value) || phone__input.value.trim().length !== 10) {
      wrongValue.textContent = "Số điện thoại phải có đúng 10 kí tự số";
      if (!form__phone.contains(wrongValue)) {
        form__phone.appendChild(wrongValue);
        phone__input.classList.add("form__wrong");
      }
      condition = false;
    } else {
      if (form__phone.contains(wrongValue)) {
        form__phone.removeChild(wrongValue);
        phone__input.classList.remove("form__wrong");
      }
      condition = true;
    }
  });

  //Kiểm tra username
  const username = document.querySelector("#username");
  const form_username = document.querySelector(".form__username");
  username.addEventListener("input", (e) => {
    if (username.value.length > 40) {
      username.value = username.value.slice(0, 40);
      wrongValue.textContent = "Tên tài khoản vượt quá 40 kí tự.";
      if (!form_username.contains(wrongValue)) {
        form_username.appendChild(wrongValue);
        username.classList.add("form__wrong");
      }
    } else {
      if (form_username.contains(wrongValue)) {
        form_username.removeChild(wrongValue);
        username.classList.remove("form__wrong");
      }
    }
  });

  //Kiểm tra address
  const address = document.querySelector("#address");
  const form_address = document.querySelector(".form__address");
  address.addEventListener("input", (e) => {
    if (address.value.length > 150) {
      address.value = address.value.slice(0, 150);
      wrongValue.textContent = "";
      if (!form_address.contains(wrongValue)) {
        form_address.appendChild(wrongValue);
        address.classList.add("form__wrong");
      }
    } else {
      if (form_address.contains(wrongValue)) {
        form_address.removeChild(wrongValue);
        address.classList.remove("form__wrong");
      }
    }
  });

  phone__input.addEventListener("blur", (e) => {
    //click ra ngoài thẻ input
    if (phone__input.value.trim() === "") {
      //thẻ input rỗng
      if (form__phone.contains(wrongValue)) {
        form__phone.removeChild(wrongValue);
        phone__input.classList.remove("form__wrong");
      }
    }
  });

  //Cập nhật lại dữ liệu info
  const form__info = document.querySelector(".form__info");
  form__info.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!condition) {
      alert("Số điện thoại không hợp lệ.");
      return;
    } else {
      //Khởi tạo lớp tài khoản (từ admin.js)
      const customer = new Account(
        username__input.value,
        loginUser.email,
        loginUser.password,
        "customer",
        phone__input.value,
        address__input.value
      );

      // Cập nhật lại dữ liệu gốc
      const index = accArray.findIndex(
        (singleArray) => singleArray.email === customer.email
      );
      if (index !== -1) {
        // accArray.splice(index, 1); // Xóa phần tử cũ
        // accArray.push(customer); // Thêm vào mảng
        accArray[index] = customer;
        localStorage.setItem("accArray", JSON.stringify(accArray)); // Lưu lại vào local storage
      }

      //Cập nhật lại tài khoản hiện tại
      localStorage.setItem("LoginUser", JSON.stringify(customer));
      alert("Cập nhật thông tin thành công.");
      window.location.reload(); // reload trang để hiển thị thông tin mới
    }
  });

  //Kiểm tra mật khẩu cũ
  const form__password = document.querySelector(".form__password");
  let conditionPass = true;
  password__input.addEventListener("input", (e) => {
    if (password__input.value !== loginUser.password) {
      wrongValue.textContent = "Mật khẩu không chính xác.";
      if (!form__password.contains(wrongValue)) {
        form__password.appendChild(wrongValue);
        password__input.classList.add("form__wrong");
      }
      condition = false;
    } else {
      if (form__password.contains(wrongValue)) {
        form__password.removeChild(wrongValue);
        password__input.classList.remove("form__wrong");
      }
      condition = true;
    }
  });

  password__input.addEventListener("blur", (e) => {
    //click ra ngoài thẻ input
    if (password__input.value.trim() === "") {
      //thẻ input rỗng
      if (form__password.contains(wrongValue)) {
        form__password.removeChild(wrongValue);
        password__input.classList.remove("form__wrong");
      }
    }
  });

  //Kiểm tra mật khẩu mới
  const new_password = document.querySelector("#new-password");
  const form_new_password = document.querySelector(".form__new-password");
  let conditionPass2 = false;
  new_password.addEventListener("input", (e) => {
    let array = new_password.value.split("");
    let lengthArray = array.length; //12 - 30 kí tự
    let upperChar = false; //1 kí tự
    let lengthNumb = 0; //1-3 số
    let uniqueChar = false; //1 kí tự
    let uniqueCharacter = ["!", "@", "#", "$", "%", "^", "&", "*"];

    //đếm kí tự
    array.forEach((singleArray) => {
      if (singleArray >= "A" && singleArray <= "Z") upperChar = true;
      uniqueCharacter.forEach((character) => {
        if (singleArray === character) uniqueChar = true;
      });
      if (!isNaN(singleArray)) lengthNumb++;
    });

    //kiểm tra số lượng kí tự
    if (
      lengthArray < 12 ||
      lengthArray > 30 ||
      !upperChar ||
      !uniqueChar ||
      lengthNumb < 1 ||
      lengthNumb > 3 ||
      new_password.value === password__input.value
    ) {
      new_password.value = new_password.value.slice(0, 30);
      wrongValue.textContent =
        "Cần 12-30 kí tự, 1 kí tự in hoa, 1 kí tự đặc biệt và có từ 1-3 kí tự số. Không trùng mật khẩu cũ";
      if (!form_new_password.contains(wrongValue)) {
        form_new_password.appendChild(wrongValue);
        new_password.classList.add("form__wrong");
      }
    } else {
      if (form_new_password.contains(wrongValue)) {
        form_new_password.removeChild(wrongValue);
        new_password.classList.remove("form__wrong");
      }
      conditionPass2 = true; //đã nhập new_password đúng điều kiện
    }
  });

  new_password.addEventListener("blur", (e) => {
    //click ra ngoài thẻ input
    if (new_password.value.trim() === "") {
      //thẻ input rỗng
      if (form_new_password.contains(wrongValue)) {
        form_new_password.removeChild(wrongValue);
        new_password.classList.remove("form__wrong");
      }
    }
  });

  //Xác nhận mật khẩu mới
  const form__re_new_password = document.querySelector(
    ".form__re-new-password"
  );
  const re_new_password = document.querySelector("#re-new-password");
  let conditionPass3 = true;
  re_new_password.addEventListener("input", (e) => {
    if (re_new_password.value !== new_password.value) {
      wrongValue.textContent = "Mật khẩu không khớp.";
      if (!form__re_new_password.contains(wrongValue)) {
        form__re_new_password.appendChild(wrongValue);
        re_new_password.classList.add("form__wrong");
      }
      conditionPass3 = false;
    } else {
      if (form__re_new_password.contains(wrongValue)) {
        form__re_new_password.removeChild(wrongValue);
        re_new_password.classList.remove("form__wrong");
      }
      conditionPass3 = true;
    }
  });

  re_new_password.addEventListener("blur", (e) => {
    //click ra ngoài thẻ input
    if (re_new_password.value.trim() === "") {
      //thẻ input rỗng
      if (form__re_new_password.contains(wrongValue)) {
        form__re_new_password.removeChild(wrongValue);
        re_new_password.classList.remove("form__wrong");
      }
    }
  });

  //Cập nhật lại dữ liệu password
  const form_pass = document.querySelector(".form-pass");
  form_pass.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!conditionPass || !conditionPass2 || !conditionPass3) {
      alert("Mật khẩu không hợp lệ.");
      return;
    } else {
      //Khởi tạo lớp tài khoản (từ admin.js)
      const customer = new Account(
        username__input.value,
        loginUser.email,
        new_password.value,
        "customer",
        phone__input.value,
        address__input.value
      );

      // Cập nhật lại dữ liệu gốc
      const index = accArray.findIndex(
        (singleArray) => singleArray.email === customer.email
      );
      if (index !== -1) {
        accArray.splice(index, 1); // Xóa phần tử cũ
        accArray.push(customer); // Thêm vào mảng
        localStorage.setItem("accArray", JSON.stringify(accArray)); // Lưu lại vào local storage
      }

      //Cập nhật lại tài khoản hiện tại
      localStorage.setItem("LoginUser", JSON.stringify(customer));
      alert("Cập nhật mật khẩu thành công.");
      window.location.reload(); // reload trang để hiển thị thông tin mới
    }
  });
});

//Show/Hide Code
let show1 = document.querySelector(".show1");
let hide1 = document.querySelector(".hide1");

show1.addEventListener("click", (e) => {
  e.preventDefault();
  let password = document.querySelector("#password");
  password.type = "text";
  show1.style.display = "none";
  hide1.style.display = "block";
});

hide1.addEventListener("click", (e) => {
  e.preventDefault();
  let password = document.querySelector("#password");
  password.type = "password";
  hide1.style.display = "none";
  show1.style.display = "block";
});

let show2 = document.querySelector(".show2");
let hide2 = document.querySelector(".hide2");

show2.addEventListener("click", (e) => {
  e.preventDefault();
  let new_password = document.querySelector("#new-password");
  new_password.type = "text";
  show2.style.display = "none";
  hide2.style.display = "block";
});

hide2.addEventListener("click", (e) => {
  e.preventDefault();
  let new_password = document.querySelector("#new-password");
  new_password.type = "password";
  hide2.style.display = "none";
  show2.style.display = "block";
});

let show3 = document.querySelector(".show3");
let hide3 = document.querySelector(".hide3");

show3.addEventListener("click", (e) => {
  e.preventDefault();
  let re_new_password = document.querySelector("#re-new-password");
  re_new_password.type = "text";
  show3.style.display = "none";
  hide3.style.display = "block";
});

hide3.addEventListener("click", (e) => {
  e.preventDefault();
  let re_new_password = document.querySelector("#re-new-password");
  re_new_password.type = "password";
  hide3.style.display = "none";
  show3.style.display = "block";
});
