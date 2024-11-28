// Hàm hiển thị chi tiết hóa đơn
function displayOrderDetails() {
    // Lấy danh sách hóa đơn từ localStorage
    let hoaDon = JSON.parse(localStorage.getItem('hoaDon')) || [];

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
        // Lấy thông tin giỏ hàng và trạng thái đơn hàng
        let cart = donHang[0]; // Phần tử đầu tiên là giỏ hàng
        let orderStatus = donHang[1]; // Phần tử thứ hai là thông tin trạng thái đơn hàng

        // Tạo một container cho mỗi hóa đơn
        let orderContainer = document.createElement("div");
        orderContainer.classList.add("order-container");
        orderContainer.classList.add("container");
        // Hiển thị tiêu đề hóa đơn
        orderContainer.innerHTML += `<h3>Đơn Hàng #${index + 1}</h3>`;

        // Hiển thị thông tin khách hàng
        if (cart.length > 0) {
            orderContainer.innerHTML += `
                <p><strong>Tên khách hàng:</strong> ${cart[0].customerInfo.name || "Không xác định"}</p>
                <p><strong>Email:</strong> ${cart[0].customerInfo.email || "Không xác định"}</p>
            `;
        }

        // Hiển thị thông tin sản phẩm trong giỏ hàng
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
        orderContainer.innerHTML += `
            <p><strong>Sản phẩm:</strong></p>
            ${productListHTML}
        `;

        // Hiển thị thông tin thanh toán và địa chỉ
        orderContainer.innerHTML += `
            <p><strong>Ngày đặt hàng:</strong> ${new Date(orderStatus.orderDate).toLocaleString()}</p>
            <p><strong>Địa chỉ nhận hàng:</strong> ${orderStatus.deliveryAddress}</p>
            <p><strong>Phương thức thanh toán:</strong> ${orderStatus.paymentMethod}</p>
            <p><strong>Tình trạng:</strong> ${orderStatus.orderStatus}</p>
        `;

        // Hiển thị tổng tiền
        let totalPrice = cart.slice(1).reduce((total, item) => {
            let price = parseInt(item.product_price.replace(/\./g, '').replace("VND", ""));
            return total + price * item.soluong;
        }, 0);
        orderContainer.innerHTML += `
            <p><strong>Tổng tiền:</strong> ${totalPrice.toLocaleString()} VND</p>
        `;

        // Thêm hóa đơn vào danh sách
        orderDetailsContainer.appendChild(orderContainer);
    });
}

// Gọi hàm khi trang tải
document.addEventListener("DOMContentLoaded", displayOrderDetails);
