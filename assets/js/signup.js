// Thông báo khi người dùng nhập sai
const wrongValue = document.createElement("span");
wrongValue.classList.add("section-desc");
wrongValue.classList.add("input__wrong");

//username
const username = document.querySelector("#username");
const form_username = document.querySelector(".form__username");
username.addEventListener("input", (e) => {
  if (username.value.length > 60) {
    username.value = username.value.slice(0, 60);
    wrongValue.textContent = "Tên tài khoản vượt quá 60 kí tự.";
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

//email
const email = document.querySelector("#email");
const form_email = document.querySelector(".form__email");
email.addEventListener("input", (e) => {
  let array = email.value.split("");
  let flag = false;
  array.forEach((singleArray) => {
    if (singleArray === "@") flag = true;
  });

  if (!flag) {
    wrongValue.textContent = "Thiếu kí tự '@'.";
    if (!form_email.contains(wrongValue)) {
      form_email.appendChild(wrongValue);
      email.classList.add("form__wrong");
    }
  } else {
    if (form_email.contains(wrongValue)) {
      form_email.removeChild(wrongValue);
      email.classList.remove("form__wrong");
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
  }
});
