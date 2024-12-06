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
  ];

  // Đẩy người dùng vào accArray
  accArray.push(...users);
  localStorage.setItem("accArray", JSON.stringify(accArray));

  let donHang, thongTin;

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

  // Tạo 50 đơn hàng với khoảng cách ngày xa nhau
  for (let i = 0; i < 50; i++) {
    donHang = [];
    thongTin = [];

    // Chọn ngẫu nhiên khách hàng và sản phẩm
    const user = users[Math.floor(Math.random() * users.length)];
    const product = products[Math.floor(Math.random() * products.length)];

    // Tính ngày đặt hàng cách nhau tối thiểu 3 ngày
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() + i * 3); // Cách nhau 3 ngày

    // Thông tin đơn hàng
    thongTin.push(user);
    thongTin.push(product);

    donHang.push(thongTin);
    donHang.push({
      deliveryAddress: user.address,
      email: user.email,
      note: "",
      orderDate: orderDate.toISOString(), // Ngày đặt hàng hiện tại
      orderStatus:
        orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
      paymentDetails: null,
      paymentMethod: "COD",
      totalAmount: parseInt(
        product.product_price.replace(".", "").replace(",", "")
      ), // Chuyển đổi giá thành số
    });

    hoaDon.push(donHang);
  }

  localStorage.setItem("hoaDon", JSON.stringify(hoaDon));

  // Đánh dấu rằng mã đã được thực thi
  localStorage.setItem("initialized", "true");
}
