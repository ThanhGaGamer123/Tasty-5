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

    // Hiển thị danh sách đơn hàng
    let orderDetailsContainer = document.getElementById("order-details");
    orderDetailsContainer.innerHTML = ""; // Xóa nội dung cũ

    hoaDon.forEach((donHang, index) => {
        let cart = donHang[0]; // Giỏ hàng
        let orderStatus = donHang[1]; // Trạng thái đơn hàng

        // Container cho mỗi đơn hàng
        let orderContainer = document.createElement("div");
        orderContainer.classList.add("order-container");

        // Phần hiển thị thu gọn
        orderContainer.innerHTML += `
            <div class="order-header" data-index="${index}">
                <span><strong>Đơn hàng #${index + 1}</strong></span>
                <span>Ngày đặt: ${new Date(orderStatus.orderDate).toLocaleDateString()}</span>
                <span>Tình trạng: <strong>${orderStatus.orderStatus}</strong></span>
                <button class="toggle-details">Hiển thị chi tiết</button>
            </div>
            <div class="order-details" id="order-details-${index}" style="display: none;">
                <!-- Nội dung chi tiết sẽ được thêm ở đây -->
            </div>
        `;

        orderDetailsContainer.appendChild(orderContainer);

        // Nút "Hiển thị chi tiết"
        let toggleBtn = orderContainer.querySelector(".toggle-details");
        toggleBtn.addEventListener("click", () => toggleOrderDetails(index, cart, orderStatus));
    });
}

function escapeHTML(str) {
    var element = document.createElement('div');
    if (str) {
        element.innerText = str;
        element.textContent = str;
    }
    return element.innerHTML;
}

function toggleOrderDetails(index, cart, orderStatus) {
    let detailsElement = document.getElementById(`order-details-${index}`);

    if (detailsElement.style.display === "block") {
        detailsElement.style.display = "none"; // Ẩn chi tiết nếu đang hiển thị
    } else {
        // Hiển thị chi tiết
        let productListHTML = "<ul>";
        cart.slice(1).forEach(item => {
            productListHTML += `
                <li>
                    <strong>${item.product_name}</strong> - ${item.product_price} VND
                    x ${item.soluong} = ${(parseInt(item.product_price.replace(/\./g, '').replace("VND", "")) * item.soluong).toLocaleString()} VND
                </li>
            `;
        });
        productListHTML += "</ul>";

        let totalPrice = cart.slice(1).reduce((total, item) => {
            let price = parseInt(item.product_price.replace(/\./g, '').replace("VND", ""));
            return total + price * item.soluong;
        }, 0);

        // Kiểm tra và thêm ghi chú (nếu có)
        let notesHTML = orderStatus.notes
            ? `<p><strong>Ghi chú:</strong> ${escapeHTML(orderStatus.notes)}</p>`
            : `<p><strong>Ghi chú:</strong> Không có</p>`;

        detailsElement.innerHTML = `
            <p><strong>Sản phẩm:</strong></p>
            ${productListHTML}
            <p><strong>Địa chỉ nhận hàng:</strong> ${orderStatus.deliveryAddress}</p>
            <p><strong>Phương thức thanh toán:</strong> ${orderStatus.paymentMethod}</p>
            ${notesHTML}
            <p><strong>Tổng tiền:</strong> ${totalPrice.toLocaleString()} VND</p>
        `;
        detailsElement.style.display = "block";
    }
}



// Lọc đơn hàng
function filterOrders() {
    let statusFilter = document.getElementById("status-filter").value;
    let dateFilter = document.getElementById("date-filter").value;

    // Lấy danh sách hóa đơn từ localStorage
    let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];

    let filteredOrders = hoaDon.filter(donHang => {
        let orderStatus = donHang[1];
        let isStatusMatch = !statusFilter || orderStatus.orderStatus === statusFilter;
        let isDateMatch = !dateFilter || new Date(orderStatus.orderDate).toLocaleDateString() === new Date(dateFilter).toLocaleDateString();

        return isStatusMatch && isDateMatch;
    });

    displayOrderDetails(filteredOrders); // Hiển thị đơn hàng đã lọc
}

// Gọi hàm hiển thị đơn hàng khi trang tải
document.addEventListener("DOMContentLoaded", () => {
    displayOrderDetails();

    // Thêm sự kiện cho nút lọc
    document.getElementById("filter-btn").addEventListener("click", filterOrders);
});
