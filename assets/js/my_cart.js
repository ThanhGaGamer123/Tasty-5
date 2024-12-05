// Hàm hiển thị chi tiết đơn hàng
let currentPage = 1;
const soluongHoaDon = 4;

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
    document.getElementById("pagination").style.display = "none"; // Ẩn thanh phân trang
    return;
  }

  // Tính toán số lượng đơn hàng cần hiển thị
  const startIndex = (currentPage - 1) * soluongHoaDon;
  const endIndex = Math.min(startIndex + soluongHoaDon, hoaDon.length);
  const ordersToDisplay = hoaDon.slice(startIndex, endIndex);
  
  // Hiển thị danh sách đơn hàng
  let orderDetailsContainer = document.getElementById("order-details");
  orderDetailsContainer.innerHTML = ""; // Xóa nội dung cũ

  ordersToDisplay.forEach((donHang, index) => {
    let cart = donHang[0]; // Giỏ hàng
    let orderStatus = donHang[1]; // Trạng thái đơn hàng

    // Container cho mỗi đơn hàng
    let orderContainer = document.createElement("div");
    orderContainer.classList.add("order-container");

    // Phần hiển thị thu gọn
    orderContainer.innerHTML += `
            <div class="order-header" data-index="${index + startIndex}">
                <span><strong>Đơn hàng #${index + startIndex + 1}</strong></span>
                <span>Ngày đặt: ${new Date(
                  orderStatus.orderDate
                ).toLocaleDateString()} ${new Date(
      orderStatus.orderDate
    ).toLocaleTimeString()}</span>
                <span>Email: <strong>${orderStatus.email}</strong></span>
                <span>Tình trạng: <strong>${
                  orderStatus.orderStatus
                }</strong></span>
                <button class="toggle-details">Hiển thị chi tiết</button>
            </div>
            <div class="order-details" id="order-details-${index + startIndex}" style="display: none;">
                <!-- Nội dung chi tiết sẽ được thêm ở đây -->
            </div>
        `;

    orderDetailsContainer.appendChild(orderContainer);

    // Nút "Hiển thị chi tiết"
    let toggleBtn = orderContainer.querySelector(".toggle-details");
    toggleBtn.addEventListener("click", () =>
      toggleOrderDetails(index + startIndex, cart, orderStatus)
    );
  });

  // Gọi hàm phân trang
  Dieukhienpage(hoaDon.length);
}

// Phân trang
function Dieukhienpage(totalProducts) {
  const phanTrangSp = document.getElementById("pagination");
  phanTrangSp.innerHTML = "";

  const totalPages = Math.ceil(totalProducts / soluongHoaDon);

  // Hiển thị thanh phân trang nếu có hơn 1 trang
  if (totalPages > 1) {
    phanTrangSp.style.display = "block"; // Hiển thị thanh phân trang

    // trang trước
    if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.innerText = "<";
      prevButton.onclick = () => {
        currentPage--;
        displayOrderDetails(); // Cập nhật lại danh sách đơn hàng
      };
      phanTrangSp.appendChild(prevButton);
    }

    // số trang
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.innerText = i;
      pageButton.onclick = () => {
        currentPage = i;
        displayOrderDetails(); // Cập nhật lại danh sách đơn hàng
      };
      if (i === currentPage) {
        pageButton.disabled = true;
      }
      phanTrangSp.appendChild(pageButton);
    }

    // trang sau
    if (currentPage < totalPages) {
      const nextButton = document.createElement("button");
      nextButton.innerText = ">";
      nextButton.onclick = () => {
        currentPage++;
        displayOrderDetails(); // Cập nhật lại danh sách đơn hàng
      };
      phanTrangSp.appendChild(nextButton);
    }
  } else {
    phanTrangSp.style.display = "none"; // Ẩn thanh phân trang nếu không có nhiều trang
  }
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
                    <strong>${item.product_name}</strong> - ${
        item.product_price
      } VND
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
            <p><strong>Địa chỉ nhận hàng:</strong> ${
              orderStatus.deliveryAddress
            }</p>
            <p><strong>Phương thức thanh toán:</strong> ${
              orderStatus.paymentMethod
            }</p>
            ${notesHTML}
            ${orderDateHTML} <!-- Thêm ngày giờ đặt hàng -->
            <p><strong>Tổng tiền:</strong> ${totalPrice.toLocaleString()} VND</p>
        `;
    detailsElement.style.display = "block";
  }
}

// Hàm lọc đơn hàng theo email
function filterOrders() {
  // Lấy thông tin người dùng đăng nhập
  const loginUser = JSON.parse(localStorage.getItem("LoginUser"));
  if (!loginUser || !loginUser.email) {
    alert("Bạn cần đăng nhập để xem đơn hàng.");
    return;
  }
  const userEmail = loginUser.email;

  // Lấy danh sách hóa đơn từ localStorage
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];

  // Lọc hóa đơn theo email
  let filteredOrders = hoaDon.filter((donHang) => {
    // Kiểm tra xem `orderStatus` có chứa email người dùng không
    let orderInfo = donHang[1];
    return orderInfo.email === userEmail; // Kiểm tra email khớp
  });

  // Đặt lại trang hiện tại về 1 sau khi lọc
  currentPage = 1;

  // Hiển thị đơn hàng đã lọc
  displayOrderDetails(filteredOrders);
}

// Hàm lọc đơn hàng với bộ lọc theo trạng thái và ngày
function filterOrdersWithFilters(statusFilter, dateFilter) {
  // Lấy thông tin người dùng đăng nhập
  const loginUser = JSON.parse(localStorage.getItem("LoginUser"));
  if (!loginUser || !loginUser.email) {
    alert("Bạn cần đăng nhập để xem đơn hàng.");
    return;
  }
  const userEmail = loginUser.email;

  // Lấy danh sách hóa đơn từ localStorage
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];

  // Lọc hóa đơn theo email, trạng thái và ngày
  let filteredOrders = hoaDon.filter((donHang) => {
    let orderInfo = donHang[1];
    let isEmailMatch = orderInfo.email === userEmail;
    let isStatusMatch = !statusFilter || orderInfo.orderStatus === statusFilter;
    let isDateMatch =
      !dateFilter ||
      new Date(orderInfo.orderDate).toLocaleDateString() ===
        new Date(dateFilter).toLocaleDateString();

    return isEmailMatch && isStatusMatch && isDateMatch;
  });

  // Đặt lại trang hiện tại về 1 sau khi lọc
  currentPage = 1;

  // Hiển thị đơn hàng đã lọc
  displayOrderDetails(filteredOrders);
}

// Lắng nghe sự kiện khi trang tải
document.addEventListener("DOMContentLoaded", () => {
  filterOrders(); // Tự động lọc đơn hàng theo email khi tải trang

  // Thêm sự kiện cho nút lọc nếu người dùng muốn lọc thêm theo trạng thái hoặc ngày
  document.getElementById("filter-btn").addEventListener("click", () => {
    let statusFilter = document.getElementById("status-filter").value;
    let dateFilter = document.getElementById("date-filter").value;

    // Gọi lại hàm `filterOrdersWithFilters` với trạng thái và ngày
    filterOrdersWithFilters(statusFilter, dateFilter);
  });
});