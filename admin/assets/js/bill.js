let currentPage = 1;
const itemsPerPage = 20;
let filteredOrdersCache = null; // Bộ nhớ tạm cho danh sách đã lọc

displayOrders();

function displayOrders() {
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  let ordersList = document.getElementById("orders-list");
  ordersList.innerHTML = ""; // Xóa nội dung hiện tại

  // Sử dụng danh sách đã lọc nếu có, ngược lại sử dụng tất cả đơn hàng
  let displayedOrders = filteredOrdersCache || hoaDon;

  // Tính toán số trang
  const totalPages = Math.ceil(displayedOrders.length / itemsPerPage);

  // Điều chỉnh currentPage nếu cần
  currentPage = Math.min(Math.max(1, currentPage), totalPages);

  // Lấy các đơn hàng cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = displayedOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Hiển thị danh sách đơn hàng
  currentOrders.forEach((order, index) => {
    let orderInfo = order[1];
    let userInfo = order[0][0];
    let orderElement = document.createElement("div");
    orderElement.classList.add("order-item");
    orderElement.innerHTML = `
            <h3>Đơn hàng #${startIndex + index + 1}</h3>
            <p><strong>Tên khách hàng:</strong> ${userInfo.name}</p>
            <p><strong>Ngày đặt hàng:</strong> ${new Date(
              orderInfo.orderDate
            ).toLocaleString()}</p>
            <p><strong>Địa chỉ nhận hàng:</strong> ${
              orderInfo.deliveryAddress
            }</p>
            <p><strong>SĐT:</strong> ${userInfo.phone}</p>
            <p><strong>Tổng tiền:</strong> ${
              orderInfo.totalAmount
                ? formatCurrency(orderInfo.totalAmount)
                : "Chưa tính"
            }</p>
            <p><strong>Trạng thái đơn hàng:</strong> 
                <select onchange="updateOrderStatus(${
                  startIndex + index
                }, this.value)">
                    <option value="Chưa xử lý" ${
                      orderInfo.orderStatus === "Chưa xử lý" ? "selected" : ""
                    }>Chưa xử lý</option>
                    <option value="Đã xác nhận" ${
                      orderInfo.orderStatus === "Đã xác nhận" ? "selected" : ""
                    }>Đã xác nhận</option>
                    <option value="Đã giao" ${
                      orderInfo.orderStatus === "Đã giao" ? "selected" : ""
                    }>Đã giao</option>
                    <option value="Đã huỷ" ${
                      orderInfo.orderStatus === "Đã huỷ" ? "selected" : ""
                    }>Đã huỷ</option>
                </select>
            </p>
            <button onclick="viewOrderDetails(${
              startIndex + index
            })">Hiển thị chi tiết</button>
        `;
    ordersList.appendChild(orderElement);
  });

  // Hiển thị nút phân trang
  displayPagination(displayedOrders.length);
}

function displayPagination(totalOrders) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // Xóa nội dung hiện tại

  // Tính toán số trang
  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  // Nút trang trước
  if (currentPage > 1) {
    const prevButton = createPageButton("<", () => {
      currentPage--;
      displayOrders(); // Hiển thị lại danh sách đơn hàng
    });
    pagination.appendChild(prevButton);
  }

  // Nút số trang
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createPageButton(i, () => {
      currentPage = i;
      displayOrders(); // Hiển thị lại danh sách đơn hàng
    });
    if (i === currentPage) {
      pageButton.disabled = true; // Vô hiệu hóa nút trang hiện tại
      pageButton.style.fontWeight = "bold"; // Làm nổi bật nút
    }
    pagination.appendChild(pageButton);
  }

  // Nút trang sau
  if (currentPage < totalPages) {
    const nextButton = createPageButton(">", () => {
      currentPage++;
      displayOrders(); // Hiển thị lại danh sách đơn hàng
    });
    pagination.appendChild(nextButton);
  }
}

// Hàm tạo nút trang
function createPageButton(text, onClick) {
  const button = document.createElement("button");
  button.innerText = text;
  button.onclick = onClick;
  return button;
}

// Cập nhật trạng thái đơn hàng
function updateOrderStatus(orderIndex, newStatus) {
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  let displayedOrders = filteredOrdersCache || hoaDon;

  // Tìm chỉ số thực trong danh sách gốc
  let realIndex = hoaDon.findIndex(
    (order) =>
      JSON.stringify(order) === JSON.stringify(displayedOrders[orderIndex])
  );

  if (realIndex === -1) {
    alert("Không thể tìm thấy đơn hàng.");
    return;
  }

  let selectedOrder = hoaDon[realIndex];
  let currentStatus = selectedOrder[1].orderStatus;

  // Không cho phép thay đổi trạng thái đơn hàng đã hủy
  if (currentStatus === "Đã huỷ" && newStatus !== currentStatus) {
    alert("Không thể thay đổi tình trạng của đơn hàng đã hủy.");
    displayOrders();
    return;
  }

  // Cập nhật trạng thái mới
  selectedOrder[1].orderStatus = newStatus;

  // Lưu lại danh sách vào localStorage
  localStorage.setItem("hoaDon", JSON.stringify(hoaDon));
  applyFilters();

  // Cập nhật trực tiếp dropdown trên giao diện
  const orderItems = document.querySelectorAll(".order-item");
  const dropdown = orderItems[orderIndex].querySelector("select");
  dropdown.value = newStatus;

  alert("Tình trạng đơn hàng đã được cập nhật.");
}

// Lọc và cập nhật danh sách đơn hàng
function applyFilters() {
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;
  let statusFilter = document.getElementById("status-filter").value;
  let districtFilter = document.getElementById("district-filter").value;

  if (startDate) startDate = new Date(startDate);
  if (endDate) endDate = new Date(endDate);

  filteredOrdersCache = hoaDon.filter((order) => {
    let orderInfo = order[1];
    let orderDate = new Date(orderInfo.orderDate);

    let isInDateRange =
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate);
    let isStatusMatch =
      statusFilter === "" || orderInfo.orderStatus === statusFilter;
    let isDistrictMatch = filterByDistrict([order], districtFilter).length > 0;

    return isInDateRange && isStatusMatch && isDistrictMatch;
  });

  // currentPage = 1; // Reset về trang đầu sau khi lọc
  displayOrders(); // Hiển thị danh sách đã lọc
}

// Lọc theo quận/huyện
function filterByDistrict(hoaDon, districtFilter) {
  return hoaDon.filter((order) => {
    let orderInfo = order[1];
    let deliveryAddress = orderInfo.deliveryAddress.trim().toLowerCase();

    if (districtFilter === "all") return true;

    let districtName = districtFilter.trim().toLowerCase();
    let addressParts = deliveryAddress.split(", ");

    return addressParts.some(
      (part) => part.trim().toLowerCase() === districtName
    );
  });
}

function formatCurrency(amount) {
  if (amount === null || amount === undefined) return "0";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
}

// Hiển thị chi tiết đơn hàng
function viewOrderDetails(originalIndex) {
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  let displayedOrders = filteredOrdersCache || hoaDon;

  // Lấy thông tin đơn hàng từ danh sách đã lọc
  let selectedOrder = displayedOrders[originalIndex];

  if (!selectedOrder) {
    alert("Không tìm thấy thông tin đơn hàng.");
    return;
  }

  // Tìm chỉ số trong hoaDon dựa trên thuộc tính duy nhất
  let realIndex = hoaDon.findIndex((order) => {
    // So sánh các thuộc tính cần thiết để xác định đơn hàng
    return (
      order[1].orderDate === selectedOrder[1].orderDate &&
      order[1].deliveryAddress === selectedOrder[1].deliveryAddress
    );
  });

  if (realIndex !== -1) {
    let order = hoaDon[realIndex];
    let cart = order[0];
    let orderInfo = order[1];
    let userInfo = order[0][0];

    let detailsContainer = document.getElementById("order-details-container");
    let detailsHTML = `
            <h2>Chi Tiết Đơn Hàng</h2>
            <p><strong>Tên Khách Hàng:</strong> ${userInfo.name}</p>
            <p><strong>Email:</strong> ${userInfo.email}</p>
            <p><strong>Ngày đặt hàng:</strong> ${new Date(
              orderInfo.orderDate
            ).toLocaleString()}</p>
            <p><strong>Địa chỉ nhận hàng:</strong> ${
              orderInfo.deliveryAddress
            }</p>
            <p><strong>SĐT:</strong> ${userInfo.phone}</p>
            <p><strong>Phương thức thanh toán:</strong> ${
              orderInfo.paymentMethod
            }</p>
            <p><strong>Ghi chú:</strong> ${
              orderInfo.note ? orderInfo.note : "Không có"
            }</p>
            <p><strong>Tổng tiền:</strong> ${
              orderInfo.totalAmount
                ? formatCurrency(orderInfo.totalAmount)
                : "Chưa tính"
            }</p>
            <h3>Sản phẩm trong giỏ hàng:</h3>
            <ul>
        `;

    cart.forEach((item) => {
      if (item && item.product_name && item.soluong && item.product_price) {
        detailsHTML += `<li>${item.product_name} - Số lượng: ${
          item.soluong
        } - Đơn giá: ${item.product_price.toLocaleString()} VND</li>`;
      }
    });

    detailsHTML += "</ul>";
    detailsContainer.innerHTML = detailsHTML;

    document.getElementById("order-details-modal").style.display = "block";
  } else {
    alert("Không tìm thấy thông tin chi tiết đơn hàng.");
  }
}

function closeOrderDetails() {
  document.getElementById("order-details-modal").style.display = "none";
}
