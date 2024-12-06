// Kiểm tra xem mã đã được chạy chưa
if (!localStorage.getItem("initialized")) {
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  if (!hoaDon) {
    localStorage.setItem("hoaDon", JSON.stringify(hoaDon));
  }

  let accArray = JSON.parse(localStorage.getItem("accArray")) || [];

  // Danh sách người dùng với thông tin bổ sung
  let users = [
    {
      name: "Nguyen Van A",
      email: "nva@gmail.com",
      phone: "0123456789",
      address: "123, Đường ABC, Phường 1, Quận 5, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Tran Van B",
      email: "tvb@gmail.com",
      phone: "0123456788",
      address: "456, Đường DEF, Phường 2, Quận 6, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Le Thi C",
      email: "ltc@gmail.com",
      phone: "0123456787",
      address: "789, Đường GHI, Phường 3, Quận 7, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Pham Van D",
      email: "pvd@gmail.com",
      phone: "0123456786",
      address: "321, Đường JKL, Phường 4, Quận 8, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Hoang Thi E",
      email: "hte@gmail.com",
      phone: "0123456785",
      address: "654, Đường MNO, Phường 5, Quận 9, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Nguyen Van F",
      email: "nvf@gmail.com",
      phone: "0123456784",
      address: "159, Đường PQR, Phường 6, Quận 10, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Tran Van G",
      email: "tvg@gmail.com",
      phone: "0123456783",
      address: "753, Đường STU, Phường 7, Quận 11, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Le Thi H",
      email: "lth@gmail.com",
      phone: "0123456782",
      address: "852, Đường VWX, Phường 8, Quận 12, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Pham Van I",
      email: "pvi@gmail.com",
      phone: "0123456781",
      address: "963, Đường YZ, Phường 9, Quận 13, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Hoang Thi J",
      email: "htj@gmail.com",
      phone: "0123456780",
      address: "789, Đường ABC, Phường 10, Quận 14, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
  ];

  // Đẩy người dùng vào accArray
  accArray.push(...users);
  localStorage.setItem("accArray", JSON.stringify(accArray));

  let donHang;

  let products = [
    {
      id: 1,
      product_name: "Ba chỉ cuộn kim châm",
      product_price: "60.000",
      product_image: "./assets/img/shopping/bachicuonnamkimcham.jpg",
      soluong: 1,
    },
    {
      id: 2,
      product_name: "Bạch tuộc nướng cay",
      product_price: "55.000",
      product_image: "./assets/img/shopping/bachtuocnuongcay.jpg",
      soluong: 1,
    },
    {
      id: 3,
      product_name: "Bánh xèo nướng Hàn Quốc",
      product_price: "35.000",
      product_image: "./assets/img/shopping/banhxeonuongHQ.webp",
      soluong: 1,
    },
    // ... (giữ nguyên danh sách sản phẩm)
  ];

  // Trạng thái đơn hàng
  const orderStatuses = ["Chưa xử lý", "Đã xác nhận", "Đã giao", "Đã hủy"];

  // Hàm tạo số thẻ ngẫu nhiên hợp lệ
  function generateCardNumber() {
    let cardNumber = "";
    for (let i = 0; i < 16; i++) {
      cardNumber += Math.floor(Math.random() * 10); // Tạo số từ 0 đến 9
    }
    return cardNumber;
  }

  // Tạo 50 đơn hàng với khoảng cách ngày xa nhau
  for (let i = 0; i < 50; i++) {
    donHang = [];
    let thongTin = [];

    // Chọn ngẫu nhiên khách hàng
    const user = users[Math.floor(Math.random() * users.length)];

    // Số lượng sản phẩm ngẫu nhiên cho đơn hàng
    const productCount = Math.floor(Math.random() * 5) + 1; // Số lượng sản phẩm từ 1 đến 5

    let totalAmount = 0; // Biến để tính tổng số tiền

    // Đẩy thông tin người dùng vào thongTin
    thongTin.push(user);

    for (let j = 0; j < productCount; j++) {
      // Chọn ngẫu nhiên một sản phẩm
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1; // Số lượng từ 1 đến 3

      // Tạo một bản sao sản phẩm để không làm thay đổi mảng gốc
      const productCopy = { ...product, soluong: quantity };

      // Đẩy sản phẩm vào thongTin
      thongTin.push(productCopy);

      // Chuyển đổi giá sản phẩm từ chuỗi sang số
      const productPrice = parseInt(
        product.product_price.replace(".", "").replace(",", ".")
      );

      // Tính tổng số tiền
      totalAmount += productPrice * quantity; // Sử dụng quantity
    }

    // Tính ngày đặt hàng cách nhau tối thiểu 3 ngày
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() + i * 3); // Cách nhau 3 ngày

    // Chọn phương thức thanh toán ngẫu nhiên
    const paymentMethods = ["COD", "BankTransfer", "EWallet"];
    const paymentMethod =
      paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const paymentDetails =
      paymentMethod !== "COD" ? generateCardNumber() : null; // Tạo số thẻ nếu không phải COD

    donHang.push(thongTin);
    donHang.push({
      deliveryAddress: user.address,
      email: user.email,
      note: "",
      orderDate: orderDate.toISOString(), // Ngày đặt hàng hiện tại
      orderStatus:
        orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
      paymentDetails: paymentDetails,
      paymentMethod: paymentMethod,
      totalAmount: totalAmount, // Tổng số tiền cho đơn hàng
    });

    hoaDon.push(donHang);
  }

  localStorage.setItem("hoaDon", JSON.stringify(hoaDon));

  // Đánh dấu rằng mã đã được thực thi
  localStorage.setItem("initialized", "true");
}
