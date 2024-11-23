// Thông báo khi người dùng nhập sai
const wrongValue = document.createElement("span");
wrongValue.classList.add("section-desc");
wrongValue.classList.add("input__wrong");

//username
function findSpecialChars(str) {
  const regex = /[!@#$%^&*(),.?":{}|<>]/g; // Mẫu tìm ký tự đặc biệt
  return str.match(regex);
}

const username = document.querySelector("#username");
const form_username = document.querySelector(".form__username");
let condition_3 = true;
username.addEventListener("input", (e) => {
  // Kiểm tra ký tự đặc biệt
  if (findSpecialChars(username.value)) {
    wrongValue.textContent = "Tên tài khoản không chứa ký tự đặc biệt.";
  } else {
    wrongValue.textContent = ""; // Xóa thông báo nếu không có ký tự đặc biệt
  }

  // Kiểm tra chiều dài tối đa
  if (username.value.length > 40) {
    username.value = username.value.slice(0, 40);
    wrongValue.textContent = "Tên tài khoản vượt quá 40 ký tự.";
  }

  // Thêm hoặc xóa thông báo lỗi
  if (wrongValue.textContent) {
    // Nếu có thông báo lỗi
    if (!form_username.contains(wrongValue)) {
      form_username.appendChild(wrongValue);
      username.classList.add("form__wrong");
      condition_3 = false;
    }
  } else {
    // Nếu không có thông báo lỗi
    if (form_username.contains(wrongValue)) {
      form_username.removeChild(wrongValue);
      username.classList.remove("form__wrong");
      condition_3 = true;
    }
  }
});

username.addEventListener("blur", (e) => {
  //click ra ngoài thẻ input
  if (username.value.trim() === "") {
    //thẻ input rỗng
    if (form_username.contains(wrongValue)) {
      form_username.removeChild(wrongValue);
      username.classList.remove("form__wrong");
    }
  }
});

//email
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

const email = document.querySelector("#email");
const form_email = document.querySelector(".form__email");
let condition_4 = false;
email.addEventListener("input", (e) => {
  let email_flag = false;
  accArray.forEach((singleArray2) => {
    if (singleArray2.email === page__email.value) {
      email_flag = true;
    }
  });

  if ((!isValidEmail(email.value) || email_flag) && email.value !== null) {
    wrongValue.textContent = "Email không hợp lệ hoặc đã được sử dụng.";
    if (!form_email.contains(wrongValue)) {
      form_email.appendChild(wrongValue);
      email.classList.add("form__wrong");
      condition_4 = false;
    }
  } else {
    if (form_email.contains(wrongValue)) {
      form_email.removeChild(wrongValue);
      email.classList.remove("form__wrong");
      condition_4 = true;
    }
  }
});

email.addEventListener("blur", (e) => {
  //click ra ngoài thẻ input
  if (email.value.trim() === "") {
    //thẻ input rỗng
    if (form_email.contains(wrongValue)) {
      form_email.removeChild(wrongValue);
      email.classList.remove("form__wrong");
    }
  }
});

//password
const password = document.querySelector("#password");
const form_password = document.querySelector(".form__password");
let condition_1 = false;
password.addEventListener("input", (e) => {
  let array = password.value.split("");
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
    lengthNumb > 3
  ) {
    password.value = password.value.slice(0, 30);
    wrongValue.textContent =
      "Cần 12-30 kí tự, 1 kí tự in hoa, 1 kí tự đặc biệt và có từ 1-3 kí tự số.";
    if (!form_password.contains(wrongValue)) {
      form_password.appendChild(wrongValue);
      password.classList.add("form__wrong");
    }
  } else {
    if (form_password.contains(wrongValue)) {
      form_password.removeChild(wrongValue);
      password.classList.remove("form__wrong");
    }
    condition_1 = true; //đã nhập password đúng điều kiện
  }
});

password.addEventListener("blur", (e) => {
  //click ra ngoài thẻ input
  if (password.value.trim() === "") {
    //thẻ input rỗng
    if (form_password.contains(wrongValue)) {
      form_password.removeChild(wrongValue);
      password.classList.remove("form__wrong");
    }
  }
});

//re_password
const re_password = document.querySelector("#re-password");
const form__re_password = document.querySelector(".form__re-password");
let condition_2 = false;
re_password.addEventListener("input", (e) => {
  if (password.value !== re_password.value) {
    re_password.value = re_password.value.slice(0, 30);
    wrongValue.textContent = "Mật khẩu không khớp.";
    if (!form__re_password.contains(wrongValue)) {
      form__re_password.appendChild(wrongValue);
      re_password.classList.add("form__wrong");
    }
  } else {
    if (form__re_password.contains(wrongValue)) {
      form__re_password.removeChild(wrongValue);
      re_password.classList.remove("form__wrong");
    }
    condition_2 = true; //đã nhập re_password đúng điều kiện
  }
});

//Gửi form tạo tài khoản
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!condition_1 || !condition_2 || !condition_3 || !condition_4) {
    alert("Thông tin đăng ký không hợp lệ.");
  } else {
    //Khởi tạo lớp tài khoản (từ admin.js)
    const customer = new Account(
      username.value,
      email.value,
      password.value,
      "customer",
      "",
      ""
    );

    //Kiểm tra tạo mới hoặc ghi đè nếu có
    if (JSON.parse(localStorage.getItem("accArray")) != null) {
      //hàm kiểm tra trùng
      function checkInfo(oldInfo, newInfo) {
        if (oldInfo.email === newInfo.email) return true;
        else return false;
      }

      let accArray = JSON.parse(localStorage.getItem("accArray")) || [];
      let flag = false;
      accArray.forEach((singleArray) => {
        if (checkInfo(singleArray, customer)) flag = true;
      });

      if (!flag) {
        accArray.push(customer);
        localStorage.setItem("accArray", JSON.stringify(accArray));
        alert("Tạo tài khoản thành công.");
        window.location.href = "./login.html";
      } else
        alert("Tài khoản email đã được sử dụng. Vui lòng sử dụng email khác.");
    } else {
      accArray.push(customer);
      localStorage.setItem("accArray", JSON.stringify(accArray));
      alert("Tạo tài khoản thành công.");
      window.location.href = "./login.html";
    }
  }
});

//Xóa sạch local storage (test)
// localStorage.clear();

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
  let re_password = document.querySelector("#re-password");
  re_password.type = "text";
  show2.style.display = "none";
  hide2.style.display = "block";
});

hide2.addEventListener("click", (e) => {
  e.preventDefault();
  let re_password = document.querySelector("#re-password");
  re_password.type = "password";
  hide2.style.display = "none";
  show2.style.display = "block";
});
