function generateProductStatistics(filteredOrders = null) {
  let hoaDon =
    filteredOrders || JSON.parse(localStorage.getItem("hoaDon")) || [];

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
  let statsContainer = document.getElementById("content");
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
  let accArray = JSON.parse(localStorage.getItem("accArray")) || [];
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
    let customerInfo = accArray.find((user) => user.email === orderInfo.email); // Tìm thông tin khách hàng
    let customerName = customerInfo ? customerInfo.name : "Không rõ";
    let phoneNumber = customerInfo ? customerInfo.phone : "Không rõ"; // Lấy số điện thoại

    let orderDetails = `
            <div class="order-item">
                <p><strong>Tên khách hàng:</strong> ${customerName}</p>
                <p><strong>Email:</strong> ${orderInfo.email}</p>
                <p><strong>Số điện thoại:</strong> ${phoneNumber}</p>
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
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  let accArray = JSON.parse(localStorage.getItem("accArray")) || [];
  let customerRevenue = calculateRevenue();

  // Chuyển doanh thu thành mảng để có thể sắp xếp
  let sortedCustomers = Object.keys(customerRevenue).map((email) => ({
    email: email,
    revenue: customerRevenue[email],
  }));

  // Sắp xếp giảm dần theo doanh thu
  sortedCustomers.sort((a, b) => b.revenue - a.revenue);

  // Lấy 5 khách hàng đầu tiên và tìm tên của họ
  let top5Customers = sortedCustomers.slice(0, 5).map((customer) => {
    // Đối chiếu email với accArray để lấy tên
    let user = accArray.find((u) => u.email === customer.email);
    return {
      name: user ? user.name : "Không rõ", // Lấy tên, nếu không có thì ghi "Không rõ"
      email: customer.email,
      revenue: customer.revenue,
    };
  });

  return top5Customers;
}

// Hiển thị thông tin 5 khách hàng phát sinh doanh thu nhiều nhất
function displayTop5Customers(filteredCustomers = null) {
  let topCustomers =
    filteredCustomers || getTop5Customers(); // Lấy danh sách top 5 khách hàng

  let customerListContainer = document.getElementById("top-customers-list");
  customerListContainer.innerHTML = ""; // Làm mới danh sách khách hàng

  topCustomers.forEach((customer) => {
    let accArray = JSON.parse(localStorage.getItem("accArray")) || [];
    let user = accArray.find((u) => u.email === customer.email);
    let customerName = user ? user.name : "Không rõ";

    let customerElement = document.createElement("div");
    customerElement.classList.add("customer-item");
    customerElement.innerHTML = `
            <h3>${customerName}</h3>
            <p>Email: ${customer.email}</p>
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
  let accArray = JSON.parse(localStorage.getItem("accArray")) || [];
  let ordersForCustomer = hoaDon.filter((order) => order[1].email === email);

  let orderDetailsContainer = document.getElementById(
    "order-details-container1"
  );
  orderDetailsContainer.innerHTML = ""; // Làm mới thông tin chi tiết

  if (ordersForCustomer.length > 0) {
    let user = accArray.find((u) => u.email === email);
    let customerName = user ? user.name : "Không rõ"; // Lấy tên khách hàng
    orderDetailsContainer.innerHTML += `<h2>Khách hàng: ${customerName}</h2>`;
  }

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





function filterCustomersByTime(startDate, endDate) {
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  let filteredOrders = filterOrdersByTime(hoaDon, startDate, endDate); // Dùng hàm lọc đã có

  // Tính doanh thu của từng khách hàng từ các đơn hàng đã lọc
  let customerRevenue = {};
  filteredOrders.forEach((order) => {
    let customerInfo = order[1];
    let totalAmount = customerInfo.totalAmount;

    if (customerInfo.orderStatus === "Đã giao") {
      if (customerRevenue[customerInfo.email]) {
        customerRevenue[customerInfo.email] += totalAmount;
      } else {
        customerRevenue[customerInfo.email] = totalAmount;
      }
    }
  });

  // Sắp xếp và lấy top 5 khách hàng
  let sortedCustomers = Object.keys(customerRevenue)
    .map((email) => ({
      email: email,
      revenue: customerRevenue[email],
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return sortedCustomers;
}



function applyCustomerTimeFilter() {
  let startDate = document.getElementById("customer-start-date").value;
  let endDate = document.getElementById("customer-end-date").value;

  if (!startDate || !endDate) {
    alert("Vui lòng chọn khoảng thời gian hợp lệ!");
    return;
  }

  let filteredCustomers = filterCustomersByTime(startDate, endDate);

  if (filteredCustomers.length === 0) {
    alert("Không có khách hàng nào trong khoảng thời gian này.");
    return;
  }

  displayTop5Customers(filteredCustomers); // Hiển thị kết quả đã lọc
}


document.addEventListener("DOMContentLoaded", function () {
  displayTop5Customers(); // Hiển thị Top 5 khách hàng tổng quát
});


//////////////////////////////////////////////////////////////
function filterOrdersByTime(hoaDon, startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  // Thêm thời gian cuối ngày vào ngày kết thúc
  end.setHours(23, 59, 59, 999);

  // Lọc các đơn hàng nằm trong khoảng thời gian
  return hoaDon.filter((order) => {
    let orderDate = new Date(order[1].orderDate);
    return orderDate >= start && orderDate <= end;
  });
}

function applyTimeFilter() {
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;

  if (!startDate || !endDate) {
    alert("Vui lòng chọn khoảng thời gian hợp lệ!");
    return;
  }

  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  let filteredOrders = filterOrdersByTime(hoaDon, startDate, endDate);

  if (filteredOrders.length === 0) {
    alert("Không có đơn hàng nào trong khoảng thời gian này.");
    return;
  }

  generateProductStatistics(filteredOrders);
}

document.addEventListener("DOMContentLoaded", function () {
  generateProductStatistics(); // Thống kê tổng quát
});

// Thoát khi click ra ngoài
document
  .querySelector("#order-details-modal")
  .addEventListener("click", function (event) {
    if (event.target === document.querySelector("#order-details-modal")) {
      closeOrderDetails();
    }
  });

document
  .querySelector("#order-details-modal1")
  .addEventListener("click", function (event) {
    if (event.target === document.querySelector("#order-details-modal1")) {
      closeOrderDetails1();
    }
  });
