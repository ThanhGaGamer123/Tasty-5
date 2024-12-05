function generateProductStatistics() {
    let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
    let productStats = {};
    let totalRevenue = 0;

    // Lọc các đơn hàng đã giao
    let deliveredOrders = hoaDon.filter(order => order[1].orderStatus === "Đã giao");

    // Tổng hợp dữ liệu thống kê
    deliveredOrders.forEach(order => {
        let cart = order[0]; // Giỏ hàng
        cart.forEach(item => {
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
        <p><strong>Tổng Doanh Thu:</strong> ${totalRevenue.toLocaleString()} NGHÌN VND</p>
        <p><strong>Mặt Hàng Bán Chạy Nhất:</strong> ${mostSoldProduct ? mostSoldProduct : "Không xác định"} (${maxQuantity !== -Infinity ? maxQuantity : 0} sản phẩm)</p>
        <p><strong>Mặt Hàng Ít Bán Nhất:</strong> ${leastSoldProduct ? leastSoldProduct : "Không xác định"} (${minQuantity !== Infinity ? minQuantity : 0} sản phẩm)</p>
        <table>
            <thead>
                <tr>
                    <th>Tên Mặt Hàng</th>
                    <th>Số Lượng Bán</th>
                    <th>Doanh Thu</th>
                    <th>Xem Hóa Đơn</th>
                </tr>
            </thead>
            <tbody id="product-stats-body">
                ${Object.keys(productStats).map(productName => {
                    let stats = productStats[productName];
                    return `
                        <tr>
                            <td>${productName}</td>
                            <td>${stats.quantity}</td>
                            <td>${stats.revenue.toLocaleString()} NGHÌN VND</td>
                            <td>
                                <button onclick="viewProductOrders('${productName}')">Xem Hóa Đơn</button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}


// Hiển thị hóa đơn liên quan đến một mặt hàng
function viewProductOrders(productName) {
    let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
    let deliveredOrders = hoaDon.filter(order => order[1].orderStatus === "Đã giao");
    let productOrders = deliveredOrders.filter(order => 
        order[0].some(item => item.product_name === productName)
    );

    let detailsContainer = document.getElementById("order-details-container");
    let modal = document.getElementById("order-details-modal");

    detailsContainer.innerHTML = `<h2>Hóa Đơn Liên Quan Đến Mặt Hàng: ${productName}</h2>`;

    productOrders.forEach(order => {
        let cart = order[0];
        let orderInfo = order[1];

        let orderDetails = `
            <div class="order-item">
                <p><strong>Ngày đặt hàng:</strong> ${new Date(orderInfo.orderDate).toLocaleString()}</p>
                <p><strong>Địa chỉ nhận hàng:</strong> ${orderInfo.deliveryAddress}</p>
                <p><strong>Tổng tiền:</strong> ${orderInfo.totalAmount.toLocaleString()} NGHÌN VND</p>
                <ul>
        `;

        cart.forEach(item => {
            if (item.product_name === productName) {
                orderDetails += `
                    <li>${item.product_name} - Số lượng: ${item.soluong} - Đơn giá: ${item.product_price.toLocaleString()} VND</li>
                `;
            }
        });

        orderDetails += `</ul></div>`;
        detailsContainer.innerHTML += orderDetails;
    });

    modal.style.display = "block";
}

// Đóng modal hóa đơn
function closeOrderDetails() {
    document.getElementById("order-details-modal").style.display = 'none';
}


document.addEventListener("DOMContentLoaded", function () {
    generateProductStatistics();
});

