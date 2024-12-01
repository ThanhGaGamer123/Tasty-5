// Hiển thị danh sách đơn hàng
function displayOrders() {
    let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
    let ordersList = document.getElementById("orders-list");

    ordersList.innerHTML = ''; // Xóa nội dung hiện tại

    hoaDon.forEach((order, index) => {
        let orderInfo = order[1]; // Lấy thông tin đơn hàng (phần tử thứ 2)

        let orderElement = document.createElement('div');
        orderElement.classList.add('order-item');
        orderElement.innerHTML = `
            <h3>Đơn hàng #${index + 1}</h3>
            <p><strong>Phương thức thanh toán:</strong> ${orderInfo.paymentMethod}</p>
            <p><strong>Ngày đặt hàng:</strong> ${new Date(orderInfo.orderDate).toLocaleString()}</p>
            <p><strong>Địa chỉ nhận hàng:</strong> ${orderInfo.deliveryAddress}</p>
            <p><strong>Trạng thái đơn hàng:</strong> 
                <select onchange="updateOrderStatus(${index}, this.value)">
                    <option value="Chưa xử lý" ${orderInfo.orderStatus === 'Chưa xử lý' ? 'selected' : ''}>Chưa xử lý</option>
                    <option value="Đã xác nhận" ${orderInfo.orderStatus === 'Đã xác nhận' ? 'selected' : ''}>Đã xác nhận</option>
                    <option value="Đã giao" ${orderInfo.orderStatus === 'Đã giao' ? 'selected' : ''}>Đã giao</option>
                    <option value="Đã huỷ" ${orderInfo.orderStatus === 'Đã huỷ' ? 'selected' : ''}>Đã huỷ</option>
                </select>
            </p>
            <p><strong>Ghi chú:</strong> ${orderInfo.note}</p>
            <p><strong>Email:</strong> ${orderInfo.email}</p>
            <button onclick="viewOrderDetails(${index})">Hiển thị chi tiết</button>
        `;
        ordersList.appendChild(orderElement);
    });
}

// Cập nhật tình trạng đơn hàng khi chọn từ dropdown
function updateOrderStatus(orderIndex, newStatus) {
    let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
    if (hoaDon[orderIndex]) {
        hoaDon[orderIndex][1].orderStatus = newStatus; // Cập nhật tình trạng đơn hàng
        localStorage.setItem("hoaDon", JSON.stringify(hoaDon)); // Lưu lại vào localStorage

        // Hiển thị lại đơn hàng với tình trạng đã cập nhật
        displayOrders();
        alert("Tình trạng đơn hàng đã được cập nhật.");
    }
}

// Hiển thị chi tiết đơn hàng trong modal
function viewOrderDetails(index) {
    let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
    if (hoaDon[index]) {
        let cart = hoaDon[index][0]; // Phần tử đầu tiên là giỏ hàng (chứa các sản phẩm)
        let orderInfo = hoaDon[index][1]; // Thông tin đơn hàng (phần tử thứ 2)

        let detailsContainer = document.getElementById("order-details-container");

        let detailsHTML = `
            <h2>Chi Tiết Đơn Hàng</h2>
            <p><strong>Phương thức thanh toán:</strong> ${orderInfo.paymentMethod}</p>
            <p><strong>Ngày đặt hàng:</strong> ${new Date(orderInfo.orderDate).toLocaleString()}</p>
            <p><strong>Địa chỉ nhận hàng:</strong> ${orderInfo.deliveryAddress}</p>
            <p><strong>Trạng thái đơn hàng:</strong> ${orderInfo.orderStatus}</p>
            <p><strong>Ghi chú:</strong> ${orderInfo.note}</p>
            <p><strong>Email:</strong> ${orderInfo.email}</p>
            <h3>Sản phẩm trong giỏ hàng:</h3>
            <ul>
        `;

        // Hiển thị các sản phẩm trong giỏ hàng, kiểm tra nếu item hợp lệ (không rỗng)
        cart.forEach(item => {
            if (item && item.product_name && item.soluong && item.product_price) {
                detailsHTML += `
                    <li>${item.product_name} - Số lượng: ${item.soluong} - Đơn giá: ${item.product_price}</li>
                `;
            }
        });

        detailsHTML += '</ul>';

        detailsContainer.innerHTML = detailsHTML;

        // Hiển thị modal
        document.getElementById("order-details-modal").style.display = 'block';
    }
}

// Đóng cửa sổ modal
function closeOrderDetails() {
    document.getElementById("order-details-modal").style.display = 'none';
}

// Gọi hàm displayOrders khi trang được tải
window.onload = displayOrders; 




///////////////////////////////////////////////////////////


