// Hàm hiển thị chi tiết hóa đơn
function displayOrderDetails() {
    let hoaDon = JSON.parse(localStorage.getItem('hoaDon')) || [];

    if (hoaDon.length === 0) {
        document.getElementById("order-details").innerHTML = `
            <p>Hiện tại bạn chưa có đơn hàng nào.</p>
        `;
        return;
    }

    let orderDetailsContainer = document.getElementById("order-details");
    orderDetailsContainer.innerHTML = ""; 

    hoaDon.forEach((donHang, index) => {
        let cart = donHang[0];
        let orderStatus = donHang[1];

        let orderContainer = document.createElement("div");
        orderContainer.classList.add("order-container", "container");

        // Thêm nút ẩn/hiển thị
        let toggleButton = document.createElement("button");
        toggleButton.textContent = "Ẩn thông tin";
        toggleButton.classList.add("toggle-btn");
        toggleButton.addEventListener("click", function () {
            let details = orderContainer.querySelector(".order-details");
            if (details.style.display === "none") {
                details.style.display = "block";
                toggleButton.textContent = "Ẩn thông tin";
            } else {
                details.style.display = "none";
                toggleButton.textContent = "Hiển thị thông tin";
            }
        });

        orderContainer.innerHTML += `<h3>Đơn Hàng #${index + 1}</h3>`;
        orderContainer.appendChild(toggleButton);

        let orderDetails = document.createElement("div");
        orderDetails.classList.add("order-details");

        if (cart.length > 0) {
            orderDetails.innerHTML += `
                <p><strong>Tên khách hàng:</strong> ${cart[0].customerInfo.name || "Không xác định"}</p>
                <p><strong>Email:</strong> ${cart[0].customerInfo.email || "Không xác định"}</p>
            `;
        }

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

        orderDetails.innerHTML += `
            <p><strong>Sản phẩm:</strong></p>
            ${productListHTML}
        `;
        orderDetails.innerHTML += `
            <p><strong>Ngày đặt hàng:</strong> ${new Date(orderStatus.orderDate).toLocaleString()}</p>
            <p><strong>Địa chỉ nhận hàng:</strong> ${orderStatus.deliveryAddress}</p>
            <p><strong>Phương thức thanh toán:</strong> ${orderStatus.paymentMethod}</p>
            <p><strong>Tình trạng:</strong> ${orderStatus.orderStatus}</p>
            <p><strong>Tổng tiền:</strong> ${cart.slice(1).reduce((total, item) => {
                let price = parseInt(item.product_price.replace(/\./g, '').replace("VND", ""));
                return total + price * item.soluong;
            }, 0).toLocaleString()} VND</p>
        `;

        orderContainer.appendChild(orderDetails);
        orderDetailsContainer.appendChild(orderContainer);
    });
}

// Gọi hàm khi trang tải
document.addEventListener("DOMContentLoaded", displayOrderDetails);
