//Khởi tạo lớp tài khoản
class Account {
  constructor(name, email, password, role, phone, address) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.phone = phone;
    this.address = address;
    this.profit = 0;
  }
}

//Tài khoản admin
const admin = new Account(
  "Admin",
  "admin@gmail.com",
  "Admin123!",
  "admin",
  "",
  ""
);

let accArray = [admin];

//Kiểm tra tạo mới hoặc ghi đè nếu có
if (localStorage.getItem("accArray") != null) {
  let accArrayLS = JSON.parse(localStorage.getItem("accArray")) || [];

  //hàm kiểm tra trùng
  function checkInfo(oldInfo, newInfo) {
    if (oldInfo.email === newInfo.email) return true;
    else return false;
  }

  accArray.forEach((singleArray) => {
    let flag = false;
    accArrayLS.forEach((singleArrayLS) => {
      if (checkInfo(singleArray, singleArrayLS)) flag = true;
    });
    if (!flag) {
      accArrayLS.push(singleArray);
    }
  });

  localStorage.setItem("accArray", JSON.stringify(accArrayLS));
} else {
  localStorage.setItem("accArray", JSON.stringify(accArray));
}

//Xóa sạch local storage (test)
// localStorage.clear();
