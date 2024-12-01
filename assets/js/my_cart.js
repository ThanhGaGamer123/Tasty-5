// Biến toàn cục để theo dõi trang hiện tại
let currentPage = 1;
const itemsPerPage = 20;

// Hàm hiển thị chi tiết đơn hàng với phân trang
function displayOrderDetails(filteredOrders = null) {
  // Lấy danh sách hóa đơn từ localStorage
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];

  // Nếu có dữ liệu lọc, sử dụng dữ liệu đó
  if (filteredOrders) {
    hoaDon = filteredOrders;
  }

  // Kiểm tra nếu không có hóa đơn nào
  if (hoaDon.length === 0) {
    document.getElementById("order-details").innerHTML = `
      <p>Hiện tại bạn chưa có đơn hàng nào.</p>
    `;
    return;
  }

  // Tính toán số trang
  const totalPages = Math.ceil(hoaDon.length / itemsPerPage);

  // Đảm bảo trang hiện tại nằm trong phạm vi hợp lệ
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  // Lấy danh sách hóa đơn cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, hoaDon.length);
  const currentOrders = hoaDon.slice(startIndex, endIndex);

  // Hiển thị danh sách đơn hàng cho trang hiện tại
  let orderDetailsContainer = document.getElementById("order-details");
  orderDetailsContainer.innerHTML = ""; // Xóa nội dung cũ

  currentOrders.forEach((donHang, index) => {
    let cart = donHang[0]; // Giỏ hàng
    let orderStatus = donHang[1]; // Trạng thái đơn hàng

    // Container cho mỗi đơn hàng
    let orderContainer = document.createElement("div");
    orderContainer.classList.add("order-container");

    // Phần hiển thị thu gọn
    orderContainer.innerHTML += `
      <div class="order-header" data-index="${startIndex + index}">
        <span><strong>Đơn hàng #${startIndex + index + 1}</strong></span>
        <span>Ngày đặt: ${new Date(orderStatus.orderDate).toLocaleDateString()} ${new Date(orderStatus.orderDate).toLocaleTimeString()}</span>
        <span>Email: <strong>${orderStatus.email}</strong></span>
        <span>Tình trạng: <strong>${orderStatus.orderStatus}</strong></span>
        <button class="toggle-details">Hiển thị chi tiết</button>
      </div>
      <div class="order-details" id="order-details-${startIndex + index}" style="display: none;">
        <!-- Nội dung chi tiết sẽ được thêm ở đây -->
      </div>
    `;

    orderDetailsContainer.appendChild(orderContainer);

    // Nút "Hiển thị chi tiết"
    let toggleBtn = orderContainer.querySelector(".toggle-details");
    toggleBtn.addEventListener("click", () =>
      toggleOrderDetails(startIndex + index, cart, orderStatus)
    );
  });

  // Hiển thị nút phân trang
  displayPagination(totalPages);
}

// Hàm bảo vệ an toàn HTML
function escapeHTML(str) {
  var element = document.createElement("div");
  if (str) {
    element.innerText = str;
    element.textContent = str;
  }
  return element.innerHTML;
}

// Hàm hiển thị chi tiết đơn hàng
function toggleOrderDetails(index, cart, orderStatus) {
  let detailsElement = document.getElementById(`order-details-${index}`);

  if (detailsElement.style.display === "block") {
    detailsElement.style.display = "none"; // Ẩn chi tiết nếu đang hiển thị
  } else {
    // Hiển thị chi tiết
    let productListHTML = "<ul>";
    cart.slice(1).forEach((item) => {
      productListHTML += `
        <li>
          <strong>${item.product_name}</strong> - ${item.product_price} VND
          x ${item.soluong} = ${(
            parseInt(item.product_price.replace(/\./g, "").replace("VND", "")) *
            item.soluong
          ).toLocaleString()} VND
        </li>
      `;
    });
    productListHTML += "</ul>";

    let totalPrice = cart.slice(1).reduce((total, item) => {
      let price = parseInt(
        item.product_price.replace(/\./g, "").replace("VND", "")
      );
      return total + price * item.soluong;
    }, 0);

    // Kiểm tra và thêm ghi chú (nếu có)
    let notesHTML = orderStatus.note
      ? `<p><strong>Ghi chú:</strong> ${escapeHTML(orderStatus.note)}</p>`
      : `<p><strong>Ghi chú:</strong> Không có</p>`;

    // Thêm thông tin ngày giờ đặt hàng vào chi tiết
    let orderDateHTML = `<p><strong>Ngày giờ đặt hàng:</strong> ${new Date(
      orderStatus.orderDate
    ).toLocaleDateString()} ${new Date(
      orderStatus.orderDate
    ).toLocaleTimeString()}</p>`;

    // Hiển thị các thông tin chi tiết của đơn hàng
    detailsElement.innerHTML = `
      <p><strong>Sản phẩm:</strong></p>
      ${productListHTML}
      <p><strong>Địa chỉ nhận hàng:</strong> ${orderStatus.deliveryAddress}</p>
      <p><strong>Phương thức thanh toán:</strong> ${orderStatus.paymentMethod}</p>
      ${notesHTML}
      ${orderDateHTML}
      <p><strong>Tổng tiền:</strong> ${totalPrice.toLocaleString()} VND</p>
    `;
    detailsElement.style.display = "block";
  }
}

// Hàm hiển thị nút phân trang
function displayPagination(totalPages) {
  let paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = ""; // Xóa nội dung cũ

  // Nút "Trang trước"
  if (currentPage > 1) {
    let prevButton = document.createElement("button");
    prevButton.textContent = "Trang trước";
    prevButton.addEventListener("click", () => {
      currentPage--;
      displayOrderDetails();
    });
    paginationContainer.appendChild(prevButton);
  }

  // Hiển thị số trang
  for (let i = 1; i <= totalPages; i++) {
    let pageButton = document.createElement("button");
    pageButton.textContent = i;
    if (i === currentPage) {
      pageButton.classList.add("active"); // Đánh dấu trang hiện tại
    }
    pageButton.addEventListener("click", () => {
      currentPage = i;
      displayOrderDetails();
    });
    paginationContainer.appendChild(pageButton);
  }

  // Nút "Trang sau"
  if (currentPage < totalPages) {
    let nextButton = document.createElement("button");
    nextButton.textContent = "Trang sau";
    nextButton.addEventListener("click", () => {
      currentPage++;
      displayOrderDetails();
    });
    paginationContainer.appendChild(nextButton);
  }
}

// Hàm lọc đơn hàng theo email
function filterOrders() {
  const loginUser = JSON.parse(localStorage.getItem("LoginUser"));
  if (!loginUser || !loginUser.email) {
    alert("Bạn cần đăng nhập để xem đơn hàng.");
    return;
  }
  const userEmail = loginUser.email;

  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  let filteredOrders = hoaDon.filter((donHang) => {
    let orderInfo = donHang[1];
    return orderInfo.email === userEmail;
  });

  displayOrderDetails(filteredOrders);
}

// Lắng nghe sự kiện khi trang tải
document.addEventListener("DOMContentLoaded", () => {
  filterOrders();
});
