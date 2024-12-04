// Hiển thị danh sách đơn hàng
function displayOrders(startDate = null, endDate = null) {
    let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
    let ordersList = document.getElementById("orders-list");

    ordersList.innerHTML = ''; // Xóa nội dung hiện tại

    // Lọc các đơn hàng trong khoảng thời gian
    if (startDate && endDate) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        hoaDon = hoaDon.filter(order => {
            let orderDate = new Date(order[1].orderDate);
            return orderDate >= startDate && orderDate <= endDate;
        });
    }

    // Hiển thị danh sách đơn hàng
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
        let currentStatus = hoaDon[orderIndex][1].orderStatus; // Lấy trạng thái hiện tại

        // Nếu trạng thái hiện tại là "Đã hủy", không cho phép thay đổi
        if (currentStatus === "Đã huỷ") {
            alert("Không thể thay đổi tình trạng của đơn hàng đã hủy.");
            applyFilters(); // Reset lại dropdown để hiển thị đúng trạng thái hiện tại
            return;
        }

        // Cập nhật tình trạng đơn hàng
        hoaDon[orderIndex][1].orderStatus = newStatus;
        localStorage.setItem("hoaDon", JSON.stringify(hoaDon)); // Lưu lại vào localStorage

        alert("Tình trạng đơn hàng đã được cập nhật.");
        applyFilters(); // Hiển thị lại danh sách theo bộ lọc hiện tại
    }
}


// Hiển thị chi tiết đơn hàng trong modal
function viewOrderDetails(originalIndex) {
    let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];

    if (hoaDon[originalIndex]) {
        let order = hoaDon[originalIndex];
        let cart = order[0]; // Giỏ hàng
        let orderInfo = order[1]; // Thông tin đơn hàng

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

// Lọc theo ngày
function applyDateFilter() {
    let startDate = document.getElementById("start-date").value;
    let endDate = document.getElementById("end-date").value;

    if (!startDate || !endDate) {
        alert("Vui lòng chọn khoảng thời gian hợp lệ.");
        return;
    }

    displayOrders(startDate, endDate); // Hiển thị lại danh sách đơn hàng với bộ lọc ngày
}

// Lọc theo tình trạng
function filterByStatus() {
    let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
    let statusFilter = document.getElementById("status-filter").value;

    let filteredOrders = hoaDon.filter(order => {
        let orderInfo = order[1]; // Lấy thông tin đơn hàng (phần tử thứ 2)
        return statusFilter === "" || orderInfo.orderStatus === statusFilter;
    });

    displayFilteredOrders(filteredOrders); // Hiển thị các đơn hàng đã lọc
}

// Hiển thị đơn hàng đã lọc
function displayFilteredOrders(filteredOrders) {
    let ordersList = document.getElementById("orders-list");
    ordersList.innerHTML = ''; // Xóa danh sách cũ

    filteredOrders.forEach((order, index) => {
        let orderInfo = order[1];
        let originalIndex = order[2]; // Chỉ số thực của đơn hàng trong hoaDon

        let orderElement = document.createElement('div');
        orderElement.classList.add('order-item');
        orderElement.innerHTML = `
            <h3>Đơn hàng #${index + 1}</h3>
            <p><strong>Phương thức thanh toán:</strong> ${orderInfo.paymentMethod}</p>
            <p><strong>Ngày đặt hàng:</strong> ${new Date(orderInfo.orderDate).toLocaleString()}</p>
            <p><strong>Địa chỉ nhận hàng:</strong> ${orderInfo.deliveryAddress}</p>
            <p><strong>Trạng thái đơn hàng:</strong> 
                <select onchange="updateOrderStatus(${originalIndex}, this.value)">
                    <option value="Chưa xử lý" ${orderInfo.orderStatus === 'Chưa xử lý' ? 'selected' : ''}>Chưa xử lý</option>
                    <option value="Đã xác nhận" ${orderInfo.orderStatus === 'Đã xác nhận' ? 'selected' : ''}>Đã xác nhận</option>
                    <option value="Đã giao" ${orderInfo.orderStatus === 'Đã giao' ? 'selected' : ''}>Đã giao</option>
                    <option value="Đã huỷ" ${orderInfo.orderStatus === 'Đã huỷ' ? 'selected' : ''}>Đã huỷ</option>
                </select>
            </p>
            <p><strong>Ghi chú:</strong> ${orderInfo.note}</p>
            <p><strong>Email:</strong> ${orderInfo.email}</p>
            <button onclick="viewOrderDetails(${originalIndex})">Hiển thị chi tiết</button>
        `;
        ordersList.appendChild(orderElement);
    });

    if (filteredOrders.length === 0) {
        ordersList.innerHTML = '<p>Không có đơn hàng nào phù hợp với tiêu chí lọc.</p>';
    }
}

// Kết hợp lọc theo ngày và trạng thái
function applyFilters() {
    let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
    let startDate = document.getElementById("start-date").value;
    let endDate = document.getElementById("end-date").value;
    let statusFilter = document.getElementById("status-filter").value;

    if (startDate) startDate = new Date(startDate);
    if (endDate) endDate = new Date(endDate);

    let filteredOrders = hoaDon.map((order, index) => {
        let orderInfo = order[1];
        let orderDate = new Date(orderInfo.orderDate);

        let isInDateRange = (!startDate || orderDate >= startDate) &&
                            (!endDate || orderDate <= endDate);
        let isStatusMatch = statusFilter === "" || orderInfo.orderStatus === statusFilter;

        if (isInDateRange && isStatusMatch) {
            return [...order, index]; // Thêm chỉ số thực
        }
        return null;
    }).filter(order => order !== null);

    displayFilteredOrders(filteredOrders);
}
