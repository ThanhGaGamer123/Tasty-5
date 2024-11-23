// Tự động thêm dữ liệu vào danh sách
const accArray = JSON.parse(localStorage.getItem("accArray")) || [];
const control_list = document.querySelector(".control-list");

if (!control_list) {
  console.error("Không tìm thấy phần tử .control-list");
}

// Hàm sắp xếp mảng dữ liệu khách hàng
function sortCustomersInLocalStorage() {
  const customersJSON = localStorage.getItem("accArray");
  if (!customersJSON) {
    console.log("Không có dữ liệu khách hàng trong localStorage.");
    return;
  }

  let customersArray = JSON.parse(customersJSON);
  customersArray.sort((a, b) => {
    if (a.name < b.name) return -1; // a đứng trước b
    if (a.name > b.name) return 1; // b đứng trước a
    return 0; // Nếu bằng nhau
  });
  localStorage.setItem("accArray", JSON.stringify(customersArray));
  console.log("Đã sắp xếp khách hàng theo tên và lưu vào localStorage.");
}
// sortCustomersInLocalStorage();

// Lọc danh sách khách hàng
const list__disable = document.querySelector(".list__disable");
const list__content0 = document.querySelector(".list__content0");
const list__content1 = document.querySelector(".list__content1");
const list__content2 = document.querySelector(".list__content2");
let flag__all = true,
  flag__active = false,
  flag__blocked = false;

// Biến để phân trang
const itemsPerPage = 3; // Số lượng khách hàng hiển thị mỗi trang
let currentPage = 1; // Trang hiện tại

// Hàm để cập nhật danh sách khách hàng
function updateControlList() {
  control_list.innerHTML = "";
  console.log(currentPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredAccounts = accArray.filter((singleArray) => {
    return (
      singleArray.role !== "admin" &&
      (flag__all ||
        (flag__active && singleArray.role === "customer") ||
        (flag__blocked && singleArray.role === "customer-blocked"))
    );
  });

  const currentAccounts = filteredAccounts.slice(startIndex, endIndex);

  currentAccounts.forEach((singleArray) => {
    const control_item = createControlItem(singleArray);
    control_list.appendChild(control_item);
  });

  updatePagination(filteredAccounts.length);
}

// Cập nhật phân trang
function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  console.log(currentPage);

  // Nút lùi
  const bg__backward = document.querySelector(".bg__backward");
  bg__backward.classList.remove("button__disable");

  if (currentPage <= 1) {
    currentPage = 1; // Đảm bảo currentPage không âm
    bg__backward.classList.add("button__disable");
  } else {
    bg__backward.onclick = () => {
      currentPage--;
      if (currentPage < 1) currentPage = 1; // Đảm bảo không bị âm
      updateControlList();
    };
  }

  // Nút lùi về đầu
  const bg__super_backward = document.querySelector(".bg__super-backward");
  bg__super_backward.classList.remove("button__disable");

  if (currentPage === 1) {
    bg__super_backward.classList.add("button__disable");
  } else {
    bg__super_backward.onclick = () => {
      currentPage = 1;
      updateControlList();
    };
  }

  // Nút tiến
  const bg__forward = document.querySelector(".bg__forward");
  bg__forward.classList.remove("button__disable");

  if (currentPage >= totalPages) {
    currentPage = totalPages; // Đảm bảo currentPage không vượt quá tổng số trang
    bg__forward.classList.add("button__disable");
  } else {
    bg__forward.onclick = () => {
      currentPage++;
      if (currentPage > totalPages) currentPage = totalPages; // Đảm bảo không vượt quá tổng số trang
      updateControlList();
    };
  }

  // Nút tiến về cuối
  const bg__super_forward = document.querySelector(".bg__super-forward");
  bg__super_forward.classList.remove("button__disable");

  if (currentPage === totalPages) {
    bg__super_forward.classList.add("button__disable");
  } else {
    bg__super_forward.onclick = () => {
      currentPage = totalPages;
      updateControlList();
    };
  }
}

// Khởi tạo danh sách với tất cả khách hàng khi trang tải
updateControlList();

// Chức năng tìm kiếm theo search bar
function updateControlListForSearch(search__input) {
  control_list.innerHTML = "";

  // Nếu ô tìm kiếm rỗng, khôi phục danh sách ban đầu
  if (search__input.value === "") {
    currentPage = 1;
  }

  const filteredAccounts = accArray.filter((singleArray) => {
    // Kiểm tra tính hợp lệ của singleArray.name
    const name = singleArray.name || ""; // Nếu không có name, sử dụng chuỗi rỗng

    return (
      singleArray.role !== "admin" &&
      (flag__all ||
        (flag__active && singleArray.role === "customer") ||
        (flag__blocked && singleArray.role === "customer-blocked")) &&
      name.includes(search__input.value) // Gọi includes trên biến name đã được đảm bảo
    );
  });

  const currentAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  currentAccounts.forEach((singleArray) => {
    const control_item = createControlItem(singleArray);
    control_list.appendChild(control_item);
  });

  updatePagination(filteredAccounts.length);
}

const search__input = document.querySelector(".search__input");
search__input.addEventListener("input", (e) => {
  updateControlListForSearch(search__input);
});

list__content0.addEventListener("click", (e) => {
  e.preventDefault();
  list__disable.textContent = list__content0.textContent;
  flag__all = true;
  flag__active = false;
  flag__blocked = false;
  currentPage = 1;
  updateControlListForSearch(search__input); // Cập nhật danh sách
});

list__content1.addEventListener("click", (e) => {
  e.preventDefault();
  list__disable.textContent = list__content1.textContent;
  flag__all = false;
  flag__active = true;
  flag__blocked = false;
  currentPage = 1;
  updateControlListForSearch(search__input); // Cập nhật danh sách
});

list__content2.addEventListener("click", (e) => {
  e.preventDefault();
  list__disable.textContent = list__content2.textContent;
  flag__all = false;
  flag__active = false;
  flag__blocked = true;
  currentPage = 1;
  updateControlListForSearch(search__input); // Cập nhật danh sách
});

// Tạo control item
function createControlItem(singleArray) {
  const control_item = document.createElement("div");
  control_item.classList.add("control-item");

  // Tạo heading
  const control__heading = document.createElement("div");
  control__heading.classList.add("control__heading");

  // Username của heading
  const control__heading_child = document.createElement("div");
  control__heading_child.classList.add("section-desc", "control__name");
  control__heading_child.textContent = singleArray.name;
  control__heading.appendChild(control__heading_child);

  // Controls của heading
  const control__heading_child_2 = document.createElement("div");
  control__heading_child_2.classList.add("control__group");

  // Tạo các nút điều khiển cho control item
  const controls = [
    { class: "control__setting", src: "./assets/img/customer/setting.svg" },
    { class: "control__lock", src: "./assets/img/customer/lock.svg" },
    { class: "control__unlock", src: "./assets/img/customer/unlock.svg" },
  ];

  controls.forEach((control) => {
    const img = createControlImage(control);
    if (img.classList.contains("control__lock")) {
      if (singleArray.role === "customer-blocked") {
        control__heading_child_2.appendChild(img);
      }
    } else if (img.classList.contains("control__unlock")) {
      if (singleArray.role === "customer") {
        control__heading_child_2.appendChild(img);
      }
    } else control__heading_child_2.appendChild(img);

    // Thêm sự kiện click cho từng biểu tượng
    img.addEventListener("click", (e) =>
      handleControlClick(e, img, singleArray)
    );
  });

  control__heading.appendChild(control__heading_child_2);
  control_item.appendChild(control__heading);
  control_item.appendChild(createControlDesc(singleArray));

  return control_item;
}

// Thêm ảnh cho các nút điều khiển của control item
function createControlImage(control) {
  const img = document.createElement("img");
  img.classList.add("control__img", control.class);
  img.src = control.src;
  return img;
}

// Tự động điền dữ liệu khách hàng
function createControlDesc(singleArray) {
  const control__desc = document.createElement("div");
  control__desc.classList.add("control__desc");

  // Email
  const email = document.createElement("div");
  email.classList.add("section-desc", "desc__email");
  email.textContent = "Email: " + singleArray.email;
  control__desc.appendChild(email);

  // Phone
  const phone = document.createElement("div");
  phone.classList.add("section-desc", "desc__phone");
  phone.textContent = "SĐT: " + singleArray.phone;
  control__desc.appendChild(phone);

  // Address
  const address = document.createElement("div");
  address.classList.add("section-desc", "desc__address");
  address.textContent = "Địa chỉ: " + singleArray.address;
  control__desc.appendChild(address);

  return control__desc;
}

// Thiết lập chức năng cho các nút điều khiển
function handleControlClick(e, img, singleArray) {
  e.preventDefault();

  // Chức năng chỉnh sửa thông tin khách hàng
  if (img.classList.contains("control__setting")) {
    // Hiển thị thông tin cài đặt khách hàng
    const overlay = document.querySelector(".overlay");
    const setting = document.querySelector(".setting");
    overlay.style.display = "block";
    setting.style.display = "block";

    // Hiển thị dữ liệu khách hàng hiện tại
    document.querySelector("#setting__username").value = singleArray.name;
    document.querySelector("#setting__phone").value = singleArray.phone;
    document.querySelector("#setting__address").value = singleArray.address;

    // Kiểm tra dữ liệu nhập vào
    // Thông báo khi người dùng nhập sai
    const wrongValue = document.createElement("span");
    wrongValue.classList.add("section-desc");
    wrongValue.classList.add("input__wrong");

    //Kiểm tra username
    function findSpecialChars(str) {
      const regex = /[!@#$%^&*(),.?":{}|<>]/g; // Mẫu tìm ký tự đặc biệt
      return str.match(regex);
    }

    const setting__username = document.querySelector("#setting__username");
    const setting__block_username = document.querySelector(
      ".setting__block-username"
    );
    let condition_3 = true;
    setting__username.addEventListener("input", (e) => {
      // Kiểm tra ký tự đặc biệt
      if (findSpecialChars(setting__username.value)) {
        wrongValue.textContent = "Tên tài khoản không chứa ký tự đặc biệt.";
      } else {
        wrongValue.textContent = ""; // Xóa thông báo nếu không có ký tự đặc biệt
      }

      // Kiểm tra chiều dài tối đa
      if (setting__username.value.length > 40) {
        setting__username.value = setting__username.value.slice(0, 40);
        wrongValue.textContent = "Tên tài khoản vượt quá 40 ký tự.";
      }

      // Thêm hoặc xóa thông báo lỗi
      if (wrongValue.textContent) {
        // Nếu có thông báo lỗi
        if (!setting__block_username.contains(wrongValue)) {
          setting__block_username.appendChild(wrongValue);
          setting__username.classList.add("form__wrong");
          condition_3 = false;
        }
      } else {
        // Nếu không có thông báo lỗi
        if (setting__block_username.contains(wrongValue)) {
          setting__block_username.removeChild(wrongValue);
          setting__username.classList.remove("form__wrong");
          condition_3 = true;
        }
      }
    });

    setting__username.addEventListener("blur", (e) => {
      //click ra ngoài thẻ input
      if (setting__username.value.trim() === "") {
        //thẻ input rỗng
        if (setting__block_username.contains(wrongValue)) {
          setting__block_username.removeChild(wrongValue);
          setting__username.classList.remove("form__wrong");
        }
      }
    });

    //Kiểm tra address
    const setting__address = document.querySelector("#setting__address");
    const setting__block_address = document.querySelector(
      ".setting__block-address"
    );
    setting__address.addEventListener("input", (e) => {
      if (setting__address.value.length > 150) {
        setting__address.value = setting__address.value.slice(0, 150);
        wrongValue.textContent = "";
        if (!setting__block_address.contains(wrongValue)) {
          setting__block_address.appendChild(wrongValue);
          setting__address.classList.add("form__wrong");
        }
      } else {
        if (setting__block_address.contains(wrongValue)) {
          setting__block_address.removeChild(wrongValue);
          setting__address.classList.remove("form__wrong");
        }
      }
    });

    //kiểm tra số phone
    const setting__block_phone = document.querySelector(
      ".setting__block-phone"
    );
    let setting__phone = document.querySelector("#setting__phone");
    let condition = true;
    setting__phone.addEventListener("input", (e) => {
      if (
        isNaN(setting__phone.value) ||
        setting__phone.value.trim().length !== 10
      ) {
        wrongValue.textContent = "Số điện thoại phải có đúng 10 kí tự số";
        if (!setting__block_phone.contains(wrongValue)) {
          setting__block_phone.appendChild(wrongValue);
          setting__phone.classList.add("form__wrong");
        }
        condition = false;
      } else {
        if (setting__block_phone.contains(wrongValue)) {
          setting__block_phone.removeChild(wrongValue);
          setting__phone.classList.remove("form__wrong");
        }
        condition = true;
      }
    });

    setting__phone.addEventListener("blur", (e) => {
      //click ra ngoài thẻ input
      if (setting__phone.value.trim() === "") {
        //thẻ input rỗng
        if (setting__block_phone.contains(wrongValue)) {
          setting__block_phone.removeChild(wrongValue);
          setting__phone.classList.remove("form__wrong");
        }
      }
    });

    //Cập nhật lại dữ liệu info
    setting.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!condition || !condition_3) {
        alert("Thông tin thay đổi không hợp lệ.");
        return;
      } else {
        // Cập nhật lại dữ liệu gốc
        singleArray.name = setting__username.value;
        singleArray.phone = setting__phone.value;
        singleArray.address = setting__address.value;
        localStorage.setItem("accArray", JSON.stringify(accArray));
        alert("Cập nhật thông tin thành công.");
        overlay.style.display = "none";
        setting.style.display = "none";
        window.location.reload(); // reload trang để hiển thị thông tin mới
      }
    });

    // Khi click ra ngoài thì đóng lại
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.style.display = "none";
        setting.style.display = "none";
      }
    });

    // Khi click vào nút thoát
    const setting__exit = document.querySelector(".setting__exit");
    setting__exit.addEventListener("click", (e) => {
      e.preventDefault();
      overlay.style.display = "none";
      setting.style.display = "none";
    });
  }

  // Chức năng khóa
  if (img.classList.contains("control__lock")) {
    // Xử lý khoá (có thể thêm chức năng ở đây)
    img.addEventListener("click", (e) => {
      e.preventDefault();
      img.classList.remove("control__lock");
      img.classList.add("control__unlock");
      img.src = "./assets/img/customer/unlock.svg";
      singleArray.role = "customer";
      localStorage.setItem("accArray", JSON.stringify(accArray));
      updateControlList(); // Cập nhật danh sách
    });
  }

  // Chức năng mở khóa
  if (img.classList.contains("control__unlock")) {
    // Xử lý mở khoá (có thể thêm chức năng ở đây)
    img.addEventListener("click", (e) => {
      e.preventDefault();
      img.classList.remove("control__unlock");
      img.classList.add("control__lock");
      img.src = "./assets/img/customer/lock.svg";
      singleArray.role = "customer-blocked";
      localStorage.setItem("accArray", JSON.stringify(accArray));
      updateControlList(); // Cập nhật danh sách
    });
  }
}

// Thêm khách hàng
const add = document.querySelector(".add");
add.addEventListener("click", (e) => {
  e.preventDefault();

  // Hiển thị thông tin cài đặt khách hàng
  const add__overlay = document.querySelector(".add__overlay");
  const add__page = document.querySelector(".add__page");
  add__overlay.style.display = "block";
  add__page.style.display = "block";

  // Kiểm tra dữ liệu nhập vào
  // Thông báo khi người dùng nhập sai
  const wrongValue2 = document.createElement("span");
  wrongValue2.classList.add("section-desc");
  wrongValue2.classList.add("input__wrong");

  //Kiểm tra username
  function findSpecialChars(str) {
    const regex = /[!@#$%^&*(),.?":{}|<>]/g; // Mẫu tìm ký tự đặc biệt
    return str.match(regex);
  }

  const page__username = document.querySelector("#page__username");
  const page__block_username = document.querySelector(".page__block-username");
  let conditioN_3 = true;
  page__username.addEventListener("input", (e) => {
    // Kiểm tra ký tự đặc biệt
    if (findSpecialChars(page__username.value)) {
      wrongValue2.textContent = "Tên tài khoản không chứa ký tự đặc biệt.";
    } else {
      wrongValue2.textContent = ""; // Xóa thông báo nếu không có ký tự đặc biệt
    }

    // Kiểm tra chiều dài tối đa
    if (page__username.value.length > 40) {
      page__username.value = page__username.value.slice(0, 40);
      wrongValue2.textContent = "Tên tài khoản vượt quá 40 ký tự.";
    }

    // Thêm hoặc xóa thông báo lỗi
    if (wrongValue2.textContent) {
      // Nếu có thông báo lỗi
      if (!page__block_username.contains(wrongValue2)) {
        page__block_username.appendChild(wrongValue2);
        page__username.classList.add("form__wrong");
        conditioN_3 = false;
      }
    } else {
      // Nếu không có thông báo lỗi
      if (page__block_username.contains(wrongValue2)) {
        page__block_username.removeChild(wrongValue2);
        page__username.classList.remove("form__wrong");
        conditioN_3 = true;
      }
    }
  });

  page__username.addEventListener("blur", (e) => {
    //click ra ngoài thẻ input
    if (page__username.value.trim() === "") {
      //thẻ input rỗng
      if (page__block_username.contains(wrongValue2)) {
        page__block_username.removeChild(wrongValue2);
        page__username.classList.remove("form__wrong");
        conditioN_3 = true;
      }
    }
  });

  // Kiểm tra email
  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const page__email = document.querySelector("#page__email");
  const page__block_email = document.querySelector(".page__block-email");
  let conditioN_4 = true;
  page__email.addEventListener("input", (e) => {
    let email_flag = false;
    accArray.forEach((singleArray2) => {
      if (singleArray2.email === page__email.value) {
        email_flag = true;
      }
    });

    if (
      (!isValidEmail(page__email.value) || email_flag) &&
      page__email.value !== null
    ) {
      wrongValue2.textContent = "Email không hợp lệ hoặc đã được sử dụng.";
      if (!page__block_email.contains(wrongValue2)) {
        page__block_email.appendChild(wrongValue2);
        page__email.classList.add("form__wrong");
        conditioN_4 = false;
      }
    } else {
      if (page__block_email.contains(wrongValue2)) {
        page__block_email.removeChild(wrongValue2);
        page__email.classList.remove("form__wrong");
        conditioN_4 = true;
      }
    }
  });

  page__email.addEventListener("blur", (e) => {
    //click ra ngoài thẻ input
    if (page__email.value.trim() === "") {
      //thẻ input rỗng
      if (page__block_email.contains(wrongValue2)) {
        page__block_email.removeChild(wrongValue2);
        page__email.classList.remove("form__wrong");
        conditioN_4 = true;
      }
    }
  });

  //Kiểm tra address
  const page__address = document.querySelector("#page__address");
  const page__block_address = document.querySelector(".page__block-address");
  page__address.addEventListener("input", (e) => {
    if (page__address.value.length > 150) {
      page__address.value = page__address.value.slice(0, 150);
      wrongValue2.textContent = "";
      if (!page__block_address.contains(wrongValue2)) {
        page__block_address.appendChild(wrongValue2);
        page__address.classList.add("form__wrong");
      }
    } else {
      if (page__block_address.contains(wrongValue2)) {
        page__block_address.removeChild(wrongValue2);
        page__address.classList.remove("form__wrong");
      }
    }
  });

  //kiểm tra số phone
  const page__block_phone = document.querySelector(".page__block-phone");
  let page__phone = document.querySelector("#page__phone");
  let conditioN = true;
  page__phone.addEventListener("input", (e) => {
    if (isNaN(page__phone.value) || page__phone.value.trim().length !== 10) {
      wrongValue2.textContent = "Số điện thoại phải có đúng 10 kí tự số";
      if (!page__block_phone.contains(wrongValue2)) {
        page__block_phone.appendChild(wrongValue2);
        page__phone.classList.add("form__wrong");
        conditioN = false;
      }
    } else {
      if (page__block_phone.contains(wrongValue2)) {
        page__block_phone.removeChild(wrongValue2);
        page__phone.classList.remove("form__wrong");
        conditioN = true;
      }
    }
  });

  page__phone.addEventListener("blur", (e) => {
    //click ra ngoài thẻ input
    if (page__phone.value.trim() === "") {
      //thẻ input rỗng
      if (page__block_phone.contains(wrongValue2)) {
        page__block_phone.removeChild(wrongValue2);
        page__phone.classList.remove("form__wrong");
        conditioN = true;
      }
    }
  });

  //Cập nhật lại dữ liệu info
  add__page.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("click");

    if (!conditioN || !conditioN_3 || !conditioN_4) {
      alert("Thông tin không hợp lệ.");
    } else {
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

      const add__data = new Account(
        page__username.value,
        page__email.value,
        "Toilakhach123!",
        "customer",
        page__phone.value,
        page__address.value
      );

      accArray.push(add__data);
      localStorage.setItem("accArray", JSON.stringify(accArray));
      alert("Thêm khách hàng thành công.");
      add__overlay.style.display = "none";
      add__page.style.display = "none";
      window.location.reload(); // reload trang để hiển thị thông tin mới
    }
  });

  // Khi click ra ngoài thì đóng lại
  add__overlay.addEventListener("click", (e) => {
    if (e.target === add__overlay) {
      add__overlay.style.display = "none";
      add__page.style.display = "none";
    }
  });

  // Khi click vào nút thoát
  const page__exit = document.querySelector(".page__exit");
  page__exit.addEventListener("click", (e) => {
    e.preventDefault();
    add__overlay.style.display = "none";
    add__page.style.display = "none";
  });
});
