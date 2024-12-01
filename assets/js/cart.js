function displayCustomerInfo() {
  // Lấy giỏ hàng từ localStorage (giả sử giỏ hàng được lưu dưới key "cart")
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra nếu giỏ hàng có ít nhất một phần tử
  if (cart.length > 0) {
    // Lấy thông tin người dùng từ phần tử cart[0]
    let customerInfo = cart[0];

    // Hiển thị thông tin khách hàng
    document.getElementById("customer-info").innerHTML = `
              <p><strong>Tên:</strong> ${customerInfo.name}</p>
              <p><strong>Email:</strong> ${customerInfo.email}</p>
              <p><strong>Số điện thoại:</strong> ${customerInfo.phone}</p>
          `;
  } else {
    // Nếu giỏ hàng trống, hiển thị thông báo yêu cầu thêm sản phẩm
    document.getElementById("customer-info").innerHTML = `
              <p>Giỏ hàng của bạn hiện tại không có thông tin khách hàng.</p>
          `;
  }
}

// Gọi hàm khi trang tải
window.onload = displayCustomerInfo;

// Gọi hàm khi trang tải
window.onload = displayCustomerInfo;

// Gọi hàm khi trang tải
window.onload = displayCustomerInfo;

// Hàm hiển thị giỏ hàng
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-list");

  if (!cartContainer) {
    console.error("Không tìm thấy phần tử chứa giỏ hàng (cart-list).");
    return;
  }

  cartContainer.innerHTML = ""; // Xóa nội dung cũ

  // Kiểm tra nếu giỏ hàng rỗng hoặc chỉ chứa thông tin khách hàng
  if (cart.length <= 1) {
    cartContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
    return;
  }

  // Bỏ qua phần tử đầu tiên (thông tin khách hàng) khi hiển thị sản phẩm
  let products = cart.slice(1);

  products.forEach((item) => {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
              <div class="cart-item-image">
                  <img src="${item.product_image}" alt="${item.product_name}">
              </div>
              <div class="cart-item-info">
                  <h3 class="cart-item-name">${item.product_name}</h3>
                  <p class="cart-item-price">${item.product_price} VND</p>
                  <div class="cart-item-quantity">
                      <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 'decrease')">-</button>
                      <input type="number" value="${item.soluong}" min="1" onchange="updateCartQuantity(${item.id}, 'input', this.value)">
                      <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 'increase')">+</button>
                  </div>
              </div>
              <button class="remove-cart-item-btn" onclick="removeFromCart(${item.id})">Xóa</button>
          `;
    cartContainer.appendChild(cartItem);
  });

  // Hiển thị tổng giá
  let totalPrice = products.reduce((total, item) => {
    let price = parseInt(
      item.product_price.replace(/\./g, "").replace("VND", "")
    );
    return total + price * item.soluong;
  }, 0);

  let totalContainer = document.createElement("div");
  totalContainer.classList.add("cart-total");
  totalContainer.innerHTML = `
          <h3>Tổng tiền: ${totalPrice.toLocaleString()} VND</h3>
          <button class="checkout-btn" onclick="checkout()">Thanh toán</button>
      `;
  cartContainer.appendChild(totalContainer);
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra sản phẩm có tồn tại không
  let product = products.find((p) => p.id === productId);
  if (!product) {
    alert("Sản phẩm không tồn tại!");
    return;
  }

  // Nếu giỏ hàng rỗng, thêm thông tin khách hàng mặc định
  if (cart.length === 0) {
    cart.push({
      customer_name: "Khách hàng chưa đăng ký",
      customer_email: "",
    });
  }

  // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
  let cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.soluong += 1; // Tăng số lượng
  } else {
    // Thêm sản phẩm mới
    cart.push({
      id: product.id,
      product_name: product.product_name,
      product_price: product.product_price,
      product_image: product.product_image,
      soluong: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Sản phẩm đã được thêm vào giỏ hàng!");
  displayCart();
}

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartQuantity(productId, action, newQuantity = null) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Bỏ qua phần tử đầu tiên (thông tin khách hàng)
  let cartItem = cart.slice(1).find((item) => item.id === productId);

  if (!cartItem) return; // Không tìm thấy sản phẩm

  if (action === "increase") {
    cartItem.soluong += 1;
  } else if (action === "decrease" && cartItem.soluong > 1) {
    cartItem.soluong -= 1;
  } else if (action === "input") {
    let quantity = parseInt(newQuantity);
    if (quantity > 0) {
      cartItem.soluong = quantity;
    } else {
      alert("Số lượng không hợp lệ!");
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  displayCartSummary();
}

// Gọi hàm hiển thị giỏ hàng khi tải trang
document.addEventListener("DOMContentLoaded", displayCart);

// Hàm hiển thị phần nhập thông tin nhận hàng và phương thức thanh toán
function displayCheckoutDetails() {
  let checkoutDetails = document.getElementById("checkout-details");
  checkoutDetails.style.display = "block";
}

// Hàm hiển thị giỏ hàng (đã thêm logic để hiển thị nút thanh toán)
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-list");

  if (!cartContainer) {
    console.error("Không tìm thấy phần tử chứa giỏ hàng (cart-list).");
    return;
  }

  cartContainer.innerHTML = ""; // Xóa nội dung cũ

  if (cart.length <= 1) {
    cartContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
    return;
  }

  let products = cart.slice(1);

  products.forEach((item) => {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
              <div class="cart-item-image">
                  <img src="${item.product_image}" alt="${item.product_name}">
              </div>
              <div class="cart-item-info">
                  <h3 class="cart-item-name">${item.product_name}</h3>
                  <p class="cart-item-price">${item.product_price} VND</p>
                  <div class="cart-item-quantity">
                      <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 'decrease')">-</button>
                      <input type="number" value="${item.soluong}" min="1" onchange="updateCartQuantity(${item.id}, 'input', this.value)">
                      <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 'increase')">+</button>
                  </div>
              </div>
              <button class="remove-cart-item-btn" onclick="removeFromCart(${item.id})">Xóa</button>
          `;
    cartContainer.appendChild(cartItem);
  });

  let totalPrice = products.reduce((total, item) => {
    let price = parseInt(
      item.product_price.replace(/\./g, "").replace("VND", "")
    );
    return total + price * item.soluong;
  }, 0);

  let totalContainer = document.createElement("div");
  totalContainer.classList.add("cart-total");
  totalContainer.innerHTML = `
          <h3>Tổng tiền: ${totalPrice.toLocaleString()} VND</h3>
          <button class="checkout-btn" onclick="displayCheckoutDetails()">Thanh toán</button>
      `;
  cartContainer.appendChild(totalContainer);
}

///////////////////////////////////////////////////////////////////

// Hàm tự động điền thông tin địa chỉ khách hàng vào form từ cart[0]
function autofillDeliveryAddress() {
  // Lấy dữ liệu giỏ hàng từ localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra nếu cart có dữ liệu và phần tử đầu tiên có thông tin cần thiết
  if (cart.length > 0 && cart[0].deliveryAddress) {
    // Tự động điền địa chỉ vào trường nhập liệu
    document.getElementById("delivery-address").value = cart[0].deliveryAddress;
  }

  // Kiểm tra nếu cart có dữ liệu và phần tử đầu tiên có thông tin người nhận
  if (cart.length > 0 && cart[0].receiverName) {
    // Tự động điền tên người nhận vào trường nhập liệu
    document.getElementById("receiver-name").value = cart[0].receiverName;
  }

  // Kiểm tra nếu cart có dữ liệu và phần tử đầu tiên có thông tin số điện thoại
  if (cart.length > 0 && cart[0].receiverPhone) {
    // Tự động điền số điện thoại vào trường nhập liệu
    document.getElementById("receiver-phone").value = cart[0].receiverPhone;
  }
}

// Gọi hàm autofillDeliveryAddress khi trang giỏ hàng được tải
document.addEventListener("DOMContentLoaded", autofillDeliveryAddress);

const provinces = [
  {
    name: "TP Hồ Chí Minh",
    districts: [
      "Quận 1",
      "Quận 2",
      "Quận 3",
      "Quận 4",
      "Quận 5",
      "Quận 6",
      "Quận 7",
      "Quận 8",
      "Quận 9",
      "Quận 10",
      "Quận 11",
      "Quận 12",
      "Quận Bình Tân",
      "Quận Bình Thạnh",
      "Quận Gò Vấp",
      "Quận Phú Nhuận",
      "Quận Tân Bình",
      "Quận Tân Phú",
      "Quận Thủ Đức",
      "Huyện Cần Giờ",
      "Huyện Củ Chi",
      "Huyện Hóc Môn",
      "Huyện Nhà Bè",
    ],
  },

  // Thêm các tỉnh thành khác vào đây
];

// Hàm để điền các tỉnh vào dropdown
function populateCities() {
  let citySelect = document.getElementById("city");
  provinces.forEach((province) => {
    let option = document.createElement("option");
    option.value = province.name;
    option.textContent = province.name;
    citySelect.appendChild(option);
  });
}

// Hàm để điền các quận vào dropdown khi thành phố được chọn
function populateDistricts(cityName) {
  let districtSelect = document.getElementById("district");
  let city = provinces.find((province) => province.name === cityName);
  districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>'; // Xóa các quận cũ
  if (city) {
    city.districts.forEach((district) => {
      let option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      districtSelect.appendChild(option);
    });
  }
}

// Gọi hàm populateCities khi trang tải
window.addEventListener("load", () => {
  populateCities();

  // Lắng nghe sự kiện thay đổi thành phố và cập nhật quận
  document.getElementById("city").addEventListener("change", (e) => {
    populateDistricts(e.target.value);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////

function displayCartSummary() {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Lấy dữ liệu giỏ hàng
  let summaryContainer = document.getElementById("cart-summary"); // Phần tử chứa tóm tắt

  if (!summaryContainer) {
    console.error(
      "Không tìm thấy phần tử chứa tóm tắt giỏ hàng (cart-summary)."
    );
    return;
  }

  summaryContainer.innerHTML = ""; // Xóa nội dung cũ

  // Nếu giỏ hàng trống hoặc chỉ chứa thông tin khách hàng
  if (cart.length <= 1) {
    summaryContainer.innerHTML =
      "<p>Giỏ hàng của bạn đang trống. Không thể tóm tắt đơn hàng.</p>";
    return;
  }

  let products = cart.slice(1); // Bỏ qua thông tin khách hàng
  let totalPrice = 0;

  // Tạo bảng tóm tắt giỏ hàng
  let table = document.createElement("table");
  table.classList.add("cart-summary-table");
  table.innerHTML = `
          <thead>
              <tr>
                  <th>Tên món</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
              </tr>
          </thead>
          <tbody></tbody>
      `;

  let tbody = table.querySelector("tbody");

  // Thêm thông tin từng sản phẩm vào bảng
  products.forEach((item) => {
    let price = parseInt(
      item.product_price.replace(/\./g, "").replace("VND", "")
    );
    let itemTotal = price * item.soluong;
    totalPrice += itemTotal;

    let row = document.createElement("tr");
    row.innerHTML = `
              <td>${item.product_name}</td>
              <td>${item.soluong}</td>
              <td>${price.toLocaleString()} VND</td>
              <td>${itemTotal.toLocaleString()} VND</td>
          `;
    tbody.appendChild(row);
  });

  // Thêm dòng tổng cộng
  let totalRow = document.createElement("tr");
  totalRow.innerHTML = `
          <td colspan="3" style="text-align: right; font-weight: bold;">Tổng cộng:</td>
          <td style="font-weight: bold; color: #e63946;">${totalPrice.toLocaleString()} VND</td>
      `;
  tbody.appendChild(totalRow);

  // Lấy thông tin đơn hàng từ localStorage
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  if (hoaDon.length > 0) {
    // Lấy thông tin đơn hàng (đơn hàng cuối cùng)
    let donHang = hoaDon[hoaDon.length - 1];
    let orderInfo = donHang[1]; // Đơn hàng đầu tiên có thông tin thanh toán

    // Tạo div chứa thông tin tóm tắt đơn hàng
    let summaryDiv = document.createElement("div");

    // Kiểm tra tính hợp lệ của địa chỉ (đảm bảo có đầy đủ thành phố, quận/huyện, và đường)
    if (orderInfo.deliveryAddress && orderInfo.deliveryAddress.trim() !== "") {
      summaryDiv.innerHTML += `
                  <p><strong>Địa chỉ giao hàng:</strong> ${orderInfo.deliveryAddress}</p>
              `;
    } else {
      summaryDiv.innerHTML += `
                  <p><strong>Địa chỉ giao hàng:</strong> Chưa có địa chỉ hợp lệ</p>
              `;
    }

    // Kiểm tra và hiển thị thông tin phương thức thanh toán nếu có
    if (orderInfo.paymentMethod) {
      summaryDiv.innerHTML += `
                  <p><strong>Phương thức thanh toán:</strong> ${orderInfo.paymentMethod}</p>
              `;
    }

    // Thêm thông tin ghi chú vào phần tóm tắt, luôn hiển thị mặc định nếu không có
    summaryDiv.innerHTML += `
              <p><strong>Ghi chú:</strong> ${
                orderInfo.note || "Không có ghi chú"
              }</p>
          `;

    // Thêm div vào phần tóm tắt
    summaryContainer.appendChild(summaryDiv);
  }

  // Gắn bảng vào container
  summaryContainer.appendChild(table);
}

// Hàm cập nhật địa chỉ khi người dùng nhập đủ thông tin
function updateAddress() {
  let city = document.getElementById("city").value.trim();
  let district = document.getElementById("district").value.trim();
  let street = document.getElementById("street").value.trim();

  // Nếu địa chỉ hợp lệ, tạo chuỗi địa chỉ đầy đủ và lưu vào localStorage
  if (city && district && street) {
    let deliveryAddress = `${street}, ${district}, ${city}`;

    // Lấy thông tin đơn hàng từ localStorage
    let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
    if (hoaDon.length > 0) {
      let donHang = hoaDon[hoaDon.length - 1]; // Đơn hàng cuối cùng
      donHang[1].deliveryAddress = deliveryAddress;

      // Cập nhật lại hoaDon vào localStorage
      localStorage.setItem("hoaDon", JSON.stringify(hoaDon));
    }

    // Cập nhật lại tóm tắt giỏ hàng
    displayCartSummary();
  }
}

// Hàm cập nhật phương thức thanh toán
function updatePaymentMethod() {
  let paymentMethod = document.querySelector(
    'input[name="payment-method"]:checked'
  ).value;

  // Lấy thông tin đơn hàng từ localStorage
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  if (hoaDon.length > 0) {
    let donHang = hoaDon[hoaDon.length - 1]; // Đơn hàng cuối cùng
    donHang[1].paymentMethod = paymentMethod;

    // Cập nhật lại hoaDon vào localStorage
    localStorage.setItem("hoaDon", JSON.stringify(hoaDon));
  }

  // Cập nhật lại tóm tắt giỏ hàng
  displayCartSummary();
}

// Hàm cập nhật ghi chú
function updateOrderNote() {
  let orderNote = document.getElementById("order-note").value.trim();

  // Lấy thông tin đơn hàng từ localStorage
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  if (hoaDon.length > 0) {
    let donHang = hoaDon[hoaDon.length - 1]; // Đơn hàng cuối cùng
    donHang[1].note = orderNote;

    // Cập nhật lại hoaDon vào localStorage
    localStorage.setItem("hoaDon", JSON.stringify(hoaDon));
  }

  // Cập nhật lại tóm tắt giỏ hàng
  displayCartSummary();
}

// Lắng nghe sự thay đổi của các trường nhập liệu và tự động cập nhật
document.getElementById("city").addEventListener("input", updateAddress);
document.getElementById("district").addEventListener("input", updateAddress);
document.getElementById("street").addEventListener("input", updateAddress);
document
  .getElementById("order-note")
  .addEventListener("input", updateOrderNote);

// Lắng nghe sự thay đổi của phương thức thanh toán
document.querySelectorAll('input[name="payment-method"]').forEach((radio) => {
  radio.addEventListener("change", updatePaymentMethod);
});

// Gọi hàm hiển thị tóm tắt khi trang tải
document.addEventListener("DOMContentLoaded", displayCartSummary);

// Hàm xác nhận thanh toán và reset thông tin
function confirmPayment() {
  // Xóa thông tin địa chỉ và ghi chú trong localStorage
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  if (hoaDon.length > 0) {
    let donHang = hoaDon[hoaDon.length - 1]; // Lấy đơn hàng cuối cùng
    donHang[1].deliveryAddress = ""; // Reset địa chỉ
    donHang[1].note = ""; // Reset ghi chú

    // Cập nhật lại thông tin đơn hàng trong localStorage
    localStorage.setItem("hoaDon", JSON.stringify(hoaDon));
  }

  // Sau khi xác nhận thanh toán, cập nhật lại tóm tắt giỏ hàng (sẽ không còn địa chỉ và ghi chú)
  displayCartSummary();
}

////////////////////////////////////////////////////////////////////////////////////////////////

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra nếu giỏ hàng trống
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }

  // Lấy thông tin khách hàng từ LoginUser
  const loginUser = JSON.parse(localStorage.getItem("LoginUser"));

  // Kiểm tra nếu có thông tin đăng nhập
  if (!loginUser) {
    alert("Bạn phải đăng nhập để tiếp tục thanh toán.");
    return;
  }

  // Lấy thông tin địa chỉ từ các trường nhập liệu
  let city = document.getElementById("city").value; // Thành phố
  let district = document.getElementById("district").value; // Quận/Huyện
  let street = document.getElementById("street").value.trim(); // Số nhà/Đường

  // Kiểm tra nếu các trường nhập liệu đầy đủ
  if (!city || !district || !street) {
    alert("Vui lòng nhập đầy đủ thông tin địa chỉ!");
    return;
  }

  // Lấy ghi chú đơn hàng từ trường nhập liệu
  let orderNote = document.getElementById("order-note").value.trim();

  // Tạo địa chỉ hoàn chỉnh theo định dạng: Số nhà/Đường, Quận/Huyện, Thành phố
  let deliveryAddress = `${street}, ${district}, ${city}`;

  // Lấy phương thức thanh toán
  let paymentMethod = document.querySelector(
    'input[name="payment-method"]:checked'
  ).value;

  // Lấy thông tin thanh toán theo phương thức đã chọn
  let paymentDetails = null;

  if (paymentMethod === "BankTransfer" || paymentMethod === "EWallet") {
    // Nếu chọn chuyển khoản ngân hàng hoặc ví điện tử
    let paymentInfo = document.getElementById("payment-details").value.trim();

    if (!paymentInfo) {
      alert("Vui lòng nhập thông tin tài khoản hoặc số thẻ.");
      return;
    }

    paymentDetails = paymentInfo;
  } else {
    // Nếu chọn thanh toán khi nhận hàng (COD), để giá trị là null
    paymentDetails = null;
  }

  // Kiểm tra nếu thông tin phương thức thanh toán hợp lệ
  if (!paymentMethod) {
    alert("Vui lòng chọn phương thức thanh toán!");
    return;
  }

  // Lấy ngày đặt hàng
  let orderDate = new Date().toISOString(); // Lấy ngày hiện tại ở định dạng ISO

  // Tạo đối tượng thông tin khách hàng
  let customerInfo = {
    name: loginUser.name, // Lấy tên từ LoginUser
    email: loginUser.email, // Lấy email từ LoginUser
    phone: loginUser.phone, // Lấy số điện thoại từ LoginUser
    address: deliveryAddress, // Địa chỉ nhận hàng
    paymentMethod: paymentMethod, // Phương thức thanh toán
    note: orderNote, // Ghi chú đơn hàng
  };

  // Tạo đơn hàng (donHang) với phần tử đầu tiên là cart
  let donHang = [];
  donHang.push(cart); // Phần tử đầu tiên của mảng donHang là giỏ hàng (cart)

  // Thêm thông tin tình trạng đơn hàng và ghi chú
  donHang.push({
    paymentMethod: paymentMethod, // Phương thức thanh toán
    orderDate: orderDate, // Ngày đặt hàng
    deliveryAddress: deliveryAddress, // Địa chỉ nhận hàng
    orderStatus: "Chưa xử lý", // Tình trạng đơn hàng (mặc định là "Chưa xử lý")
    note: orderNote, // Ghi chú đơn hàng
    paymentDetails: paymentDetails, // Thêm thông tin thanh toán vào
    email: loginUser.email, // Đảm bảo email của người dùng được lưu chính xác
  });

  // Kiểm tra xem mảng hoaDon đã có trong localStorage chưa, nếu chưa thì khởi tạo mảng rỗng
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];

  // Thêm donHang vào mảng hoaDon
  hoaDon.push(donHang);

  // Lưu mảng hoaDon vào localStorage
  localStorage.setItem("hoaDon", JSON.stringify(hoaDon));

  // Giả lập thanh toán thành công
  alert("Thanh toán thành công! Cảm ơn quý khách!");

  // Xóa giỏ hàng sau khi thanh toán
  localStorage.removeItem("cart");

  // Gửi thông tin đơn hàng ra console để kiểm tra
  console.log("Thông tin hóa đơn:", hoaDon);
  removeCartItemByEmail();

  // Cập nhật giao diện giỏ hàng sau khi thanh toán
  displayCart(); // Cập nhật lại giỏ hàng (có thể bạn cần định nghĩa hàm này)
  displayCartSummary(); // Cập nhật lại tổng số tiền giỏ hàng (cũng có thể bạn cần định nghĩa hàm này)

  // Ẩn phần nhập thông tin
  document.getElementById("checkout-details").style.display = "none";
}

// Lắng nghe sự kiện thay đổi phương thức thanh toán
document.querySelectorAll('input[name="payment-method"]').forEach((input) => {
  input.addEventListener("change", function () {
    let paymentMethod = this.value;
    if (paymentMethod === "BankTransfer" || paymentMethod === "EWallet") {
      // Hiển thị trường nhập thông tin tài khoản/thẻ
      document.getElementById("payment-info").style.display = "block";
    } else {
      // Ẩn trường nhập thông tin tài khoản/thẻ
      document.getElementById("payment-info").style.display = "none";
    }
  });
});

// Xử lý nút xác nhận thanh toán
document
  .getElementById("final-checkout-btn")
  .addEventListener("click", checkout);
document
  .getElementById("final-checkout-btn")
  .addEventListener("click", confirmPayment);

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Bỏ qua phần tử đầu tiên khi lọc sản phẩm
  cart = [cart[0], ...cart.slice(1).filter((item) => item.id !== productId)];

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Sản phẩm đã được xóa khỏi giỏ hàng!");
  displayCart();
  displayCartSummary();
}

document.addEventListener("DOMContentLoaded", () => {
  displayCartSummary(); // Hiển thị tóm tắt giỏ hàng ngay khi trang tải
});

function removeCartItemByEmail() {
  let cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
  let cartArray_new = [];
  let userEmail = JSON.parse(localStorage.getItem("LoginUser")).email;

  // Kiểm tra nếu mảng không trống
  if (cartArray.length > 0) {
    cartArray.forEach((singleCart) => {
      if (userEmail !== singleCart[0].email) {
        cartArray_new.push(singleCart);
      }
    });
    localStorage.setItem("cartArray", JSON.stringify(cartArray_new));
  }
}
