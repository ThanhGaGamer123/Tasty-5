// Tự động thêm dữ liệu vào danh sách
const accArray = JSON.parse(localStorage.getItem("accArray")) || [];
const control_list = document.querySelector(".control-list");

if (!control_list) {
  console.error("Không tìm thấy phần tử .control-list");
}

accArray.forEach((singleArray) => {
  if (singleArray.role !== "admin") {
    const control_item = createControlItem(singleArray);
    control_list.appendChild(control_item);
  }
});

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

  // Tạo các controls
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

function createControlImage(control) {
  const img = document.createElement("img");
  img.classList.add("control__img", control.class);
  img.src = control.src;
  return img;
}

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

function handleControlClick(e, img, singleArray) {
  e.preventDefault();

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
    const setting__username = document.querySelector("#setting__username");
    const setting__block_username = document.querySelector(
      ".setting__block-username"
    );
    setting__username.addEventListener("input", (e) => {
      if (setting__username.value.length > 40) {
        setting__username.value = setting__username.value.slice(0, 40);
        wrongValue.textContent = "Tên tài khoản vượt quá 40 kí tự.";
        if (!setting__block_username.contains(wrongValue)) {
          setting__block_username.appendChild(wrongValue);
          setting__username.classList.add("form__wrong");
        }
      } else {
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
      if (!condition) {
        alert("Số điện thoại không hợp lệ.");
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

  if (img.classList.contains("control__lock")) {
    // Xử lý khoá (có thể thêm chức năng ở đây)
    img.addEventListener("click", (e) => {
      e.preventDefault();
      img.classList.remove("control__lock");
      img.classList.add("control__unlock");
      img.src = "./assets/img/customer/unlock.svg";
      singleArray.role = "customer";
      localStorage.setItem("accArray", JSON.stringify(accArray));
    });
  }

  if (img.classList.contains("control__unlock")) {
    // Xử lý mở khoá (có thể thêm chức năng ở đây)
    img.addEventListener("click", (e) => {
      e.preventDefault();
      img.classList.remove("control__unlock");
      img.classList.add("control__lock");
      img.src = "./assets/img/customer/lock.svg";
      singleArray.role = "customer-blocked";
      localStorage.setItem("accArray", JSON.stringify(accArray));
    });
  }
}
