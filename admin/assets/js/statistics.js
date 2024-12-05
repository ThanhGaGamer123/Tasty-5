function generateProductStatistics() {
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  let productStats = {};
  let totalRevenue = 0;

  // Lọc các đơn hàng đã giao
  let deliveredOrders = hoaDon.filter(
    (order) => order[1].orderStatus === "Đã giao"
  );

  // Tổng hợp dữ liệu thống kê
  deliveredOrders.forEach((order) => {
    let cart = order[0]; // Giỏ hàng
    cart.forEach((item) => {
      if (!item || !item.product_name || !item.soluong || !item.product_price) {
        // Bỏ qua nếu dữ liệu mặt hàng không đầy đủ
        return;
      }

      let { product_name, soluong, product_price } = item;

      if (!productStats[product_name]) {
        productStats[product_name] = {
          quantity: 0,
          revenue: 0,
          orders: [],
        };
      }

      productStats[product_name].quantity += soluong;
      productStats[product_name].revenue += soluong * product_price;
      productStats[product_name].orders.push(order);
      totalRevenue += soluong * product_price;
    });
  });

  // Tìm mặt hàng bán chạy và ít nhất
  let mostSoldProduct = null;
  let leastSoldProduct = null;
  let maxQuantity = -Infinity;
  let minQuantity = Infinity;

  for (let productName in productStats) {
    let { quantity } = productStats[productName];
    if (quantity > maxQuantity) {
      maxQuantity = quantity;
      mostSoldProduct = productName;
    }
    if (quantity < minQuantity) {
      minQuantity = quantity;
      leastSoldProduct = productName;
    }
  }

  // Hiển thị kết quả thống kê
  let statsContainer = document.getElementById("statistics-container");
  statsContainer.innerHTML = `
        <h2>Thống Kê Mặt Hàng</h2>
        <p><strong>Tổng Doanh Thu:</strong> ${totalRevenue.toLocaleString()},000 VND</p>
        <p><strong>Mặt Hàng Bán Chạy Nhất:</strong> ${
          mostSoldProduct ? mostSoldProduct : "Không xác định"
        } (${maxQuantity !== -Infinity ? maxQuantity : 0} sản phẩm)</p>
        <p><strong>Mặt Hàng Ít Bán Nhất:</strong> ${
          leastSoldProduct ? leastSoldProduct : "Không xác định"
        } (${minQuantity !== Infinity ? minQuantity : 0} sản phẩm)</p>
        <table width="100%">
            <thead>
                <tr>
                    <th>Tên Mặt Hàng</th>
                    <th>Số Lượng Bán</th>
                    <th>Doanh Thu</th>
                    <th>Xem Hóa Đơn</th>
                </tr>
            </thead>
            
                ${Object.keys(productStats)
                  .map((productName) => {
                    let stats = productStats[productName];
                    return `
                        <tr>
                            <td><div class="prod-img-title"><p>${productName}</p></div></td>
                            <td>${stats.quantity}</td>
                            <td>${stats.revenue.toLocaleString()},000 VND</td>
                            <td>
                                <button class="btn-detail product-order-detail" data-id="2" onclick="viewProductOrders('${productName}')">Xem Hóa Đơn</button>
                            </td>
                        </tr>
                    `;
                  })
                  .join("")}
            
        </table>
    `;
}

// Hiển thị hóa đơn liên quan đến một mặt hàng
function viewProductOrders(productName) {
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  let deliveredOrders = hoaDon.filter(
    (order) => order[1].orderStatus === "Đã giao"
  );
  let productOrders = deliveredOrders.filter((order) =>
    order[0].some((item) => item.product_name === productName)
  );

  let detailsContainer = document.getElementById("order-details-container");
  let modal = document.getElementById("order-details-modal");

  detailsContainer.innerHTML = `<h2>Hóa Đơn Liên Quan Đến Mặt Hàng: ${productName}</h2>`;

  productOrders.forEach((order) => {
    let cart = order[0];
    let orderInfo = order[1];

    let orderDetails = `
            <div class="order-item">
                <p><strong>Ngày đặt hàng:</strong> ${new Date(
                  orderInfo.orderDate
                ).toLocaleString()}</p>
                <p><strong>Địa chỉ nhận hàng:</strong> ${
                  orderInfo.deliveryAddress
                }</p>
                <p><strong>Tổng tiền:</strong> ${orderInfo.totalAmount.toLocaleString()} VND</p>
                <ul>
        `;

    cart.forEach((item) => {
      if (item.product_name === productName) {
        orderDetails += `
                    <li>${item.product_name} - Số lượng: ${
          item.soluong
        } - Đơn giá: ${item.product_price.toLocaleString()} VND</li>
                `;
      }
    });

    orderDetails += `</ul></div>`;
    detailsContainer.innerHTML += orderDetails;
  });

  modal.style.display = "flex";
}

// Đóng modal hóa đơn
function closeOrderDetails() {
  document.getElementById("order-details-modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  generateProductStatistics();
});

//////////////////////////////////////////////////////////////////////////////////////////////////

// Tính toán doanh thu của từng khách hàng
function calculateRevenue() {
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  let customerRevenue = {}; // Đối tượng chứa doanh thu của từng khách hàng

  hoaDon.forEach((order) => {
    let customerInfo = order[1]; // Thông tin khách hàng
    let orderInfo = order[1]; // Thông tin đơn hàng
    let orderStatus = orderInfo.orderStatus; // Lấy trạng thái đơn hàng

    // Chỉ tính doanh thu nếu đơn hàng có trạng thái "Đã giao"
    if (orderStatus === "Đã giao") {
      let totalAmount = orderInfo.totalAmount; // Tổng tiền đơn hàng

      // Cộng dồn doanh thu cho khách hàng
      if (customerRevenue[customerInfo.email]) {
        customerRevenue[customerInfo.email] += totalAmount;
      } else {
        customerRevenue[customerInfo.email] = totalAmount;
      }
    }
  });

  return customerRevenue;
}

// Lấy ra 5 khách hàng phát sinh doanh thu nhiều nhất
function getTop5Customers() {
  let customerRevenue = calculateRevenue();

  // Chuyển đối tượng thành mảng để có thể sắp xếp
  let sortedCustomers = Object.keys(customerRevenue).map((email) => ({
    email: email,
    revenue: customerRevenue[email],
  }));

  // Sắp xếp giảm dần theo doanh thu
  sortedCustomers.sort((a, b) => b.revenue - a.revenue);

  // Lấy 5 khách hàng đầu tiên
  return sortedCustomers.slice(0, 5);
}

// Hiển thị thông tin 5 khách hàng phát sinh doanh thu nhiều nhất
function displayTop5Customers() {
  let topCustomers = getTop5Customers();
  let customerListContainer = document.getElementById("top-customers-list");
  customerListContainer.innerHTML = ""; // Làm mới danh sách khách hàng

  topCustomers.forEach((customer) => {
    let orderInfo = getOrderByCustomerEmail(customer.email); // Lấy thông tin đơn hàng

    let customerElement = document.createElement("div");
    customerElement.classList.add("customer-item");
    customerElement.innerHTML = `
            <h3>Email: ${customer.email}</h3>
            <p>Doanh thu: ${customer.revenue.toLocaleString()} VND</p>
            <button onclick="viewOrdersByCustomer('${
              customer.email
            }')">Hóa đơn người dùng</button>
        `;

    customerListContainer.appendChild(customerElement);
  });
}

function getOrderByCustomerEmail(email) {
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  return hoaDon.find((order) => order[1].email === email)[1]; // Trả về thông tin đơn hàng của khách hàng
}

// Hiển thị các đơn hàng của khách hàng
function viewOrdersByCustomer(email) {
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  let ordersForCustomer = hoaDon.filter((order) => order[1].email === email);

  let orderDetailsContainer = document.getElementById(
    "order-details-container1"
  );
  orderDetailsContainer.innerHTML = ""; // Làm mới thông tin chi tiết

  ordersForCustomer.forEach((order) => {
    let orderInfo = order[1];

    let orderElement = document.createElement("div");
    orderElement.classList.add("order-item");
    orderElement.innerHTML = `
            <h4>Đơn hàng ngày: ${new Date(
              orderInfo.orderDate
            ).toLocaleDateString()}</h4>
            <p><strong>Địa chỉ nhận hàng:</strong> ${
              orderInfo.deliveryAddress
            }</p>
            <p><strong>Trạng thái:</strong> ${orderInfo.orderStatus}</p>
            
        `;
    orderDetailsContainer.appendChild(orderElement);
  });
  // Hiển thị modal
  const modal = document.getElementById("order-details-modal1");
  if (modal) {
    modal.style.display = "flex"; // Hiển thị modal
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayTop5Customers(); // Hiển thị 5 khách hàng phát sinh doanh thu nhiều nhất
});
function closeOrderDetails1() {
  const modal = document.getElementById("order-details-modal1");
  if (modal) {
    modal.style.display = "none"; // Ẩn modal
  }
}
