//Tự động thêm dữ liệu vào danh sách
const accArray = JSON.parse(localStorage.getItem("accArray")) || [];
accArray.forEach((singleArray) => {
  if (singleArray.role != "admin") {
    // Lấy danh sách khách hàng
    let control_list = document.querySelector(".control-list");

    // tạo thẻ khách hàng
    let control_item = document.createElement("div");
    control_item.classList.add("control-item");

    // tạo heading
    let control__heading = document.createElement("div");
    control__heading.classList.add("control__heading");

    // username của heading
    let control__heading_child = document.createElement("div");
    control__heading_child.classList.add("section-desc");
    control__heading_child.classList.add("control__name");
    control__heading_child.textContent = singleArray.name;
    control__heading.appendChild(control__heading_child);

    // controls của heading
    let control__heading_child_2 = document.createElement("div");
    control__heading_child_2.classList.add("control__group");

    // Tạo các controls
    const controls = [
      { class: "control__setting", src: "./assets/img/customer/setting.svg" },
      { class: "control__lock", src: "./assets/img/customer/lock.svg" },
      { class: "control__unlock", src: "./assets/img/customer/unlock.svg" },
    ];

    controls.forEach((control) => {
      const img = document.createElement("img");
      img.classList.add("control__img", control.class);
      img.src = control.src;
      control__heading_child_2.appendChild(img);

      // Thêm sự kiện click cho từng biểu tượng
      img.addEventListener("click", (e) => {
        e.preventDefault();
        if (img.classList.contains("control__setting")) {
        }
        if (img.classList.contains("control__lock")) {
        }
        if (img.classList.contains("control__unlock")) {
        }
      });
    });

    control__heading.appendChild(control__heading_child_2);
    control_item.appendChild(control__heading);

    // tạo desc
    let control__desc = document.createElement("div");
    control__desc.classList.add("control__desc");

    //email
    let email = document.createElement("div");
    email.classList.add("section-desc");
    email.classList.add("desc__email");
    email.textContent = "Email: " + singleArray.email;
    control__desc.appendChild(email);

    // phone
    let phone = document.createElement("div");
    phone.classList.add("section-desc");
    phone.classList.add("desc__phone");
    phone.textContent = "Phone: " + singleArray.phone;
    control__desc.appendChild(phone);

    // address
    let address = document.createElement("div");
    address.classList.add("section-desc");
    address.classList.add("desc__address");
    address.textContent = "Address: " + singleArray.address;
    control__desc.appendChild(address);

    control_item.appendChild(control__desc);

    control_list.appendChild(control_item);
  }
});
