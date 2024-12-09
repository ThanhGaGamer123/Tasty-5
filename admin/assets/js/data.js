// Kiểm tra xem mã đã được chạy chưa
if (!localStorage.getItem("initialized")) {
  let hoaDon = JSON.parse(localStorage.getItem("hoaDon")) || [];
  if (!hoaDon) {
    localStorage.setItem("hoaDon", JSON.stringify(hoaDon));
  }

  let accArray = JSON.parse(localStorage.getItem("accArray")) || [];

  // Danh sách người dùng với thông tin bổ sung từ các quận trong TP. HCM
  let users = [
    {
      name: "Nguyen Van A",
      email: "nva@gmail.com",
      phone: "0123456789",
      address: "123, Đường ABC, Phường 1, Quận 1, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Tran Van B",
      email: "tvb@gmail.com",
      phone: "0123456788",
      address: "456, Đường DEF, Phường 2, Quận 2, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Le Thi C",
      email: "ltc@gmail.com",
      phone: "0123456787",
      address: "789, Đường GHI, Phường 3, Quận 3, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Pham Van D",
      email: "pvd@gmail.com",
      phone: "0123456786",
      address: "321, Đường JKL, Phường 4, Quận 4, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Hoang Thi E",
      email: "hte@gmail.com",
      phone: "0123456785",
      address: "654, Đường MNO, Phường 5, Quận 5, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Nguyen Van F",
      email: "nvf@gmail.com",
      phone: "0123456784",
      address: "159, Đường PQR, Phường 6, Quận 6, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Tran Van G",
      email: "tvg@gmail.com",
      phone: "0123456783",
      address: "753, Đường STU, Phường 7, Quận 7, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Le Thi H",
      email: "lth@gmail.com",
      phone: "0123456782",
      address: "852, Đường VWX, Phường 8, Quận 8, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Pham Van I",
      email: "pvi@gmail.com",
      phone: "0123456781",
      address: "963, Đường YZ, Phường 9, Quận 9, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Hoang Thi J",
      email: "htj@gmail.com",
      phone: "0123456780",
      address: "789, Đường ABC, Phường 10, Quận 10, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Nguyen Van K",
      email: "nvk@gmail.com",
      phone: "0123456790",
      address: "321, Đường DEF, Phường 11, Quận 11, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Tran Van L",
      email: "tvL@gmail.com",
      phone: "0123456782",
      address: "654, Đường GHI, Phường 12, Quận 12, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Le Thi M",
      email: "ltm@gmail.com",
      phone: "0123456783",
      address: "159, Đường JKL, Phường 1, Quận Bình Tân, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Pham Van N",
      email: "pvn@gmail.com",
      phone: "0123456784",
      address: "753, Đường MNO, Phường 2, Quận Bình Thạnh, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Hoang Thi O",
      email: "hto@gmail.com",
      phone: "0123456785",
      address: "852, Đường PQR, Phường 3, Quận Gò Vấp, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Nguyen Van P",
      email: "nvp@gmail.com",
      phone: "0123456786",
      address: "963, Đường STU, Phường 4, Quận Phú Nhuận, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Tran Van Q",
      email: "tvq@gmail.com",
      phone: "0123456787",
      address: "789, Đường VWX, Phường 5, Quận Tân Bình, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Le Thi R",
      email: "ltr@gmail.com",
      phone: "0123456788",
      address: "321, Đường YZ, Phường 6, Quận Tân Phú, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Pham Van S",
      email: "pvs@gmail.com",
      phone: "0123456789",
      address: "654, Đường ABC, Phường 7, Quận Thủ Đức, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Nguyen Thi T",
      email: "ntt@gmail.com",
      phone: "0123456791",
      address: "135, Đường GHI, Phường 8, Huyện Cần Giờ, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Tran Van U",
      email: "tvU@gmail.com",
      phone: "0123456792",
      address: "246, Đường JKL, Phường 9, Huyện Củ Chi, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Nguyen Van V",
      email: "nvv@gmail.com",
      phone: "0123456793",
      address: "357, Đường MNO, Phường 12, Huyện Hóc Môn, TP Hồ Chí Minh",
      password: "Toilakhach123!",
      role: "customer",
      profit: 0,
    },
    {
      name: "Hoang Thi W",
      email: "htw@gmail.com",
      phone: "0123456794",
      address: "468, Đường PQR, Phường 1, Huyện Nhà Bè, TP Hồ Chí Minh",
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
    {
      id: 4,
      product_name: "Bạch tuộc nướng phô mai",
      product_price: "57.000",
      product_image: "./assets/img/shopping/bachtuocnuongphomai.jpg",
      soluong: 1,
    },
    {
      id: 5,
      product_name: "Bò nướng muối ớt",
      product_price: "45.000",
      product_image: "./assets/img/shopping/bonuongmuoiot.jpg",
      soluong: 1,
    },
    {
      id: 6,
      product_name: "Bò cuộn lá lốt",
      product_price: "30.000",
      product_image: "./assets/img/shopping/bocuonlalot.png",
      soluong: 1,
    },
    {
      id: 7,
      product_name: "Cá mú nướng giấy bạc",
      product_price: "40.000",
      product_image: "./assets/img/shopping/camunuonggiaybac.jpg",
      soluong: 1,
    },
    {
      id: 8,
      product_name: "Cánh gà nướng mật ong",
      product_price: "34.000",
      product_image: "./assets/img/shopping/canhganuongmatong.jpg",
      soluong: 1,
    },
    {
      id: 9,
      product_name: "Đuôi heo nướng sả",
      product_price: "37.000",
      product_image: "./assets/img/shopping/duoiheonuongxaot.jpg",
      soluong: 1,
    },
    {
      id: 10,
      product_name: "Gyu-kushi-xiên bò",
      product_price: "55.000",
      product_image: "./assets/img/shopping/gyu-kushi.jpg",
      soluong: 1,
    },
    {
      id: 11,
      product_name: "Mực nướng vị Hàn",
      product_price: "43.000",
      product_image: "./assets/img/shopping/muc_nuongHQ.webp",
      soluong: 1,
    },
    {
      id: 12,
      product_name: "Sườn cừu",
      product_price: "75.000",
      product_image: "./assets/img/shopping/suon_cuu.jpg",
      soluong: 1,
    },
    {
      id: 13,
      product_name: "Sườn bò nướng",
      product_price: "65.000",
      product_image: "./assets/img/shopping/suonbonuong.jpg",
      soluong: 1,
    },
    {
      id: 14,
      product_name: "Thịt dê nướng",
      product_price: "57.000",
      product_image: "./assets/img/shopping/thitdenuong.jpg",
      soluong: 1,
    },
    {
      id: 15,
      product_name: "Thịt gà nướng cay",
      product_price: "38.000",
      product_image: "./assets/img/shopping/thitganuongcay.jpg",
      soluong: 1,
    },
    {
      id: 16,
      product_name: "Thịt heo nướng sa tế",
      product_price: "46.000",
      product_image: "./assets/img/shopping/thitheonuongsate.jpg",
      soluong: 1,
    },
    {
      id: 17,
      product_name: "Tôm nướng mỡ hành",
      product_price: "45.000",
      product_image: "./assets/img/shopping/tom_nuong.jpg",
      soluong: 1,
    },
    {
      id: 18,
      product_name: "Tôm nướng phô mai",
      product_price: "67.000",
      product_image: "./assets/img/shopping/tomnuongphomai.jpg",
      soluong: 1,
    },
    {
      id: 19,
      product_name: "Yakitori",
      product_price: "47.000",
      product_image: "./assets/img/shopping/yakitori_ga(nhatban).jpg",
      soluong: 1,
    },
    {
      id: 20,
      product_name: "Salad rau ăn kèm",
      product_price: "5.000",
      product_image: "./assets/img/shopping/saladrau.jpg",
      soluong: 1,
    },
    {
      id: 21,
      product_name: "Hào nướng mỡ hành",
      product_price: "50.000",
      product_image: "./assets/img/shopping/haonuongmohanh.jpg",
      soluong: 1,
    },
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
  for (let i = 0; i < 100; i++) {
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
    orderDate.setDate(orderDate.getDate() - i * 3); // Cách nhau 3 ngày

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
