//Khởi tạo lớp tài khoản
class Account {
  constructor(name, email, password, role, phone, address) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.phone = phone;
    this.address = address;
  }
}

//Tài khoản admin
const admin_1 = new Account(
  "Phạm Nguyễn Phú Thành",
  "thanhphamnguyenphu2k5@gmail.com",
  "TaolaThanh123!",
  "admin",
  "",
  ""
);

const admin_2 = new Account(
  "Phạm Nguyễn Phú Thành",
  "thanhphamnguyenphu2k5@gmail.com",
  "TaolaThanh123!",
  "admin",
  "",
  ""
);

const admin_3 = new Account(
  "Phạm Nguyễn Phú Thành",
  "thanhphamnguyenphu2k5@gmail.com",
  "TaolaThanh123!",
  "admin",
  "",
  ""
);

const admin_4 = new Account(
  "Phạm Nguyễn Phú Thành",
  "thanhphamnguyenphu2k5@gmail.com",
  "TaolaThanh123!",
  "admin",
  "",
  ""
);

const admin_5 = new Account(
  "Huỳnh Xuân Thiện",
  "huynhxuanthien0401@gmail.com",
  "Taothien111/",
  "admin",
  "",
  ""
);

let accArray = [admin_1, admin_2, admin_3, admin_4, admin_5];

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
