// Tạo sản phẩm mặc định
function createProduct() {
  if (localStorage.getItem("products") == null) {
    const products = [
      {
        id: 1,
        product_name: "Ba chỉ cuộn kim châm",
        product_price: "60.000",
        product_image: "./assets/img/shopping/bachicuonnamkimcham.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Heo",
        desc: "Món ba chỉ bò tươi ngon cuộn nấm kim châm, nướng chín mềm với nước sốt đậm đà.",
      },
      {
        id: 2,
        product_name: "Bạch tuộc nướng cay",
        product_price: "55.000",
        product_image: "./assets/img/shopping/bachtuocnuongcay.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Hải sản",
        desc: "Bạch tuộc tươi, nướng chín tới cùng gia vị cay nồng, giữ nguyên độ giòn dai hấp dẫn.",
      },
      {
        id: 3,
        product_name: "Bánh xèo nướng Hàn Quốc",
        product_price: "35.000",
        product_image: "./assets/img/shopping/banhxeonuongHQ.webp",
        added_to_cart: false,
        soluong: 1,
        topic: "Bánh nướng",
        desc: "Bánh xèo Hàn Quốc giòn tan với nhân hải sản, rau củ, và lớp vỏ vàng ruộm.",
      },
      {
        id: 4,
        product_name: "Bạch tuộc nướng phô mai",
        product_price: "57.000",
        product_image: "./assets/img/shopping/bachtuocnuongphomai.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Hải sản",
        desc: "Bạch tuộc tươi kết hợp với lớp phô mai béo ngậy, tạo nên sự hòa quyện độc đáo.",
      },
      {
        id: 5,
        product_name: "Bò nướng muối ớt",
        product_price: "45.000",
        product_image: "./assets/img/shopping/bonuongmuoiot.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Bò",
        desc: "Thịt bò mềm nướng cùng muối ớt đậm đà, cay nhẹ, vừa miệng.",
      },
      {
        id: 6,
        product_name: "Bò cuộn lá lốt",
        product_price: "30.000",
        product_image: "./assets/img/shopping/bocuonlalot.png",
        added_to_cart: false,
        soluong: 1,
        topic: "Bò",
        desc: "Thịt bò thơm ngon cuộn lá lốt, nướng trên lửa than, giữ trọn hương vị dân dã.",
      },
      {
        id: 7,
        product_name: "Cá mú nướng giấy bạc",
        product_price: "40.000",
        product_image: "./assets/img/shopping/camunuonggiaybac.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Hải sản",
        desc: "Cá mú tươi được nướng trong giấy bạc cùng gia vị, giữ trọn vị ngọt tự nhiên.",
      },
      {
        id: 8,
        product_name: "Cánh gà nướng mật ong",
        product_price: "34.000",
        product_image: "./assets/img/shopping/canhganuongmatong.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Gà",
        desc: "Cánh gà được ướp mật ong và gia vị, nướng vàng óng, thơm ngọt quyến rũ.",
      },
      {
        id: 9,
        product_name: "Đuôi heo nướng sả",
        product_price: "37.000",
        product_image: "./assets/img/shopping/duoiheonuongxaot.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Heo",
        desc: "Đuôi heo được ướp sả thơm lừng, nướng vàng giòn, vị béo ngậy hấp dẫn.",
      },
      {
        id: 10,
        product_name: "Gyu-kushi-xiên bò",
        product_price: "55.000",
        product_image: "./assets/img/shopping/gyu-kushi.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Bò",
        desc: "Xiên bò kiểu Nhật nướng trên than hoa, giữ trọn vị ngon mềm và gia vị đặc trưng.",
      },
      {
        id: 11,
        product_name: "Mực nướng vị Hàn",
        product_price: "43.000",
        product_image: "./assets/img/shopping/muc_nuongHQ.webp",
        added_to_cart: false,
        soluong: 1,
        topic: "Hải sản",
        desc: "Mực tươi nướng với gia vị Hàn Quốc, đậm đà, cay nhẹ, hương vị khó quên.",
      },
      {
        id: 12,
        product_name: "Sườn cừu",
        product_price: "75.000",
        product_image: "./assets/img/shopping/suon_cuu.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Dê,cừu",
        desc: "Sườn cừu nướng mềm, ướp gia vị đặc biệt, thơm ngon và bổ dưỡng.",
      },
      {
        id: 13,
        product_name: "Sườn bò nướng",
        product_price: "65.000",
        product_image: "./assets/img/shopping/suonbonuong.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Bò",
        desc: "Sườn bò nướng chín mềm, ướp gia vị đậm đà, thơm lừng.",
      },
      {
        id: 14,
        product_name: "Thịt dê nướng",
        product_price: "57.000",
        product_image: "./assets/img/shopping/thitdenuong.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Dê,cừu",
        desc: "Thịt dê tươi nướng trên lửa hồng, giữ được vị thơm ngon, hấp dẫn.",
      },
      {
        id: 15,
        product_name: "Thịt gà nướng cay",
        product_price: "38.000",
        product_image: "./assets/img/shopping/thitganuongcay.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Gà",
        desc: "Gà nướng với gia vị cay nồng, thơm lừng, thích hợp cho những ai yêu thích món cay.",
      },
      {
        id: 16,
        product_name: "Thịt heo nướng sa tế",
        product_price: "46.000",
        product_image: "./assets/img/shopping/thitheonuongsate.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Heo",
        desc: "Thịt heo nướng sa tế cay nồng, thơm lừng, ăn kèm rau sống.",
      },
      {
        id: 17,
        product_name: "Tôm nướng mỡ hành",
        product_price: "45.000",
        product_image: "./assets/img/shopping/tom_nuong.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Hải sản",
        desc: "Tôm nướng với mỡ hành béo ngậy, giữ trọn vị ngọt của tôm tươi.",
      },
      {
        id: 18,
        product_name: "Tôm nướng phô mai",
        product_price: "67.000",
        product_image: "./assets/img/shopping/tomnuongphomai.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Hải sản",
        desc: "Tôm nướng kết hợp phô mai tan chảy, tạo nên món ăn độc đáo.",
      },
      {
        id: 19,
        product_name: "Yakitori",
        product_price: "47.000",
        product_image: "./assets/img/shopping/yakitori_ga(nhatban).jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Gà",
        desc: "Món xiên gà nướng kiểu Nhật, tẩm gia vị đậm đà, thích hợp làm món khai vị.",
      },
      {
        id: 20,
        product_name: "Salad rau ăn kèm",
        product_price: "5.000",
        product_image: "./assets/img/shopping/saladrau.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Rau",
        desc: "Salad tươi mát từ các loại rau sống, dùng để ăn kèm với các món nướng.",
      },
      {
        id: 21,
        product_name: "Hào nướng mỡ hành",
        product_price: "50.000",
        product_image: "./assets/img/shopping/haonuongmohanh.jpg",
        added_to_cart: false,
        soluong: 1,
        topic: "Hải sản",
        desc: "Sự kết hợp hoàn hảo giữa vị ngọt tươi của biển cả và hương thơm đặc trưng của mỡ hành phi, mang đến một trải nghiệm ẩm thực tuyệt vời.",
      },
    ];

    localStorage.setItem("products", JSON.stringify(products));
  }
}

window.onload = createProduct;

// Hiển thị sản phẩm
let currentPage = 1;
const soLuongSpPerPage = 9;

function displayProducts(filteredProducts = null) {
  const productList = document.getElementById("product-list");
  const products =
    filteredProducts || JSON.parse(localStorage.getItem("products"));

  if (products && products.length > 0) {
    productList.innerHTML = "";

    const startIndex = (currentPage - 1) * soLuongSpPerPage;
    const endIndex = startIndex + soLuongSpPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    paginatedProducts.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");
      productItem.innerHTML = `
                <div class="product-card">
                    <div class="product-image">
                        <img class="img-pro" src="${product.product_image}" alt="${product.product_name}" onclick="chiTietSanPham(${product.id})">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.product_name}</h3>
                        <p class="product-price">${product.product_price} VND</p>
                    </div>
                    <div class="setting-pro">
                        <button class="btn-set btn-edit" onclick="editProduct(${product.id})">Chỉnh sửa món ăn</button>
                        <button class="btn-set btn-delete" onclick="deleteProduct(${product.id})">Xóa món ăn</button>
                    </div>
                </div>
            `;
      productList.appendChild(productItem);
    });
    updatePagination(products.length);
  } else {
    productList.innerHTML = "<p>Không có sản phẩm nào để hiển thị.</p>";
  }
}

function updatePagination(totalProducts) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalProducts / soLuongSpPerPage);

  // Trang trước
  if (currentPage > 1) {
    const prevButton = createPageButton("<", () => {
      currentPage--;
      displayProducts();
    });
    pagination.appendChild(prevButton);
  }

  // Số trang
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createPageButton(i, () => {
      currentPage = i;
      displayProducts();
    });
    if (i === currentPage) {
      pageButton.disabled = true;
    }
    pagination.appendChild(pageButton);
  }

  // Trang sau
  if (currentPage < totalPages) {
    const nextButton = createPageButton(">", () => {
      currentPage++;
      displayProducts();
    });
    pagination.appendChild(nextButton);
  }
}

function createPageButton(text, onClick) {
  const button = document.createElement("button");
  button.innerText = text;
  button.onclick = onClick;
  return button;
}

// Tìm kiếm sản phẩm
function searchProducts() {
  const searchInput = document
    .querySelector(".search-filter__input")
    .value.toLowerCase();
  const selectedTopic = document.querySelector(".search-filter__select").value;

  let products = JSON.parse(localStorage.getItem("products")) || [];
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(searchInput);
    const matchesTopic = selectedTopic ? product.topic === selectedTopic : true;
    return matchesSearch && matchesTopic;
  });

  currentPage = 1; // Reset trang hiện tại
  displayProducts(filteredProducts); // Hiển thị kết quả với phân trang
}

// Sự kiện tìm kiếm
document
  .querySelector(".search-filter__button")
  .addEventListener("click", searchProducts);

// Mở modal
document
  .getElementById("add-product-btn")
  .addEventListener("click", function () {
    const modal = document.querySelector(".modal");
    modal.style.display = "flex"; // Hiện modal
  });

// Đóng modal
document.querySelector(".modal-close").addEventListener("click", function () {
  const modal = document.querySelector(".modal");
  modal.style.display = "none"; // Ẩn modal
  document.querySelector(".add-product-form").reset();
});

// Xử lý thêm sản phẩm

function getPathImage(path) {
  let patharr = path.split("/");
  return "./assets/img/shopping/" + patharr[patharr.length - 1];
}

function uploadImage(el) {
  const file = el.files[0]; // Lấy tệp đầu tiên từ input

  if (file) {
    const maxSizeInMB = 0.2; // Giới hạn kích thước tệp là 100KB
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Chuyển MB thành Bytes

    // Kiểm tra kích thước tệp
    if (file.size > maxSizeInBytes) {
      alert(
        "Dung lượng tệp quá lớn! Vui lòng chọn tệp nhỏ hơn " +
          maxSizeInMB * 1000 +
          "KB."
      );
      el.value = ""; // Xóa input nếu tệp không hợp lệ
      document.querySelector(".upload-image-preview").setAttribute("src", ""); // Xóa hình ảnh xem trước
      return; // Dừng thực hiện hàm
    }

    let path = el.value; // Lấy giá trị từ phần tử input
    let pathParts = path.split(/\\|\//); // Tách bằng cả dấu "\\" và "/"
    let newPath = "./assets/img/shopping/" + pathParts[pathParts.length - 1]; // Lấy tên tệp
    document
      .querySelector(".upload-image-preview")
      .setAttribute("src", newPath); // Cập nhật src của hình ảnh xem trước
  }
}

document
  .querySelector(".modal-close.product-form")
  .addEventListener("click", () => {
    setDefaultValue();
  });

function setDefaultValue() {
  document.querySelector(".upload-image-preview").src =
    "./assets/img/shopping/blank-image.png";
  document.getElementById("ten-mon").value = "";
  document.getElementById("gia-moi").value = "";
  document.getElementById("mo-ta").value = "";
  document.getElementById("chon-mon").value = "Món chay";
}

function createId(arr) {
  // Kiểm tra xem mảng có rỗng không
  if (arr.length === 0) {
    return 0; // Nếu mảng rỗng, trả về ID đầu tiên là 0
  }

  // Lấy tất cả ID và tìm ID lớn nhất
  const maxId = Math.max(...arr.map((item) => item.id));

  return maxId + 1; // Trả về ID lớn nhất + 1
}
function formatPrice(value) {
  // Thêm dấu chấm vào số
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function hasDecimalPoint(value) {
  // Kiểm tra xem chuỗi có chứa dấu chấm hay không
  return /\./.test(value);
}

let btnAddProductIn = document.getElementById("add-product-button");
btnAddProductIn.addEventListener("click", (e) => {
  e.preventDefault();
  let imgProduct = getPathImage(
    document.querySelector(".upload-image-preview").src
  );
  let tenMon = document.getElementById("ten-mon").value;
  let price = document.getElementById("gia-moi").value;
  let moTa = document.getElementById("mo-ta").value;
  let categoryText = document.getElementById("chon-mon").value;
  if (tenMon == "" || price == "" || moTa == "") {
    alert("Vui lòng nhập đầy đủ thông tin món!");
  } else {
    if (isNaN(price) || price <= 0 || hasDecimalPoint(price)) {
      alert("Giá phải là một số hợp lệ và lớn hơn 0!");
    } else {
      price = formatPrice(price);
      let products = localStorage.getItem("products")
        ? JSON.parse(localStorage.getItem("products"))
        : [];
      let product = {
        id: createId(products),
        product_name: tenMon,
        product_price: price,
        product_image: imgProduct,
        added_to_cart: false,
        soluong: 1,
        topic: categoryText,
        desc: moTa,
      };
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
      alert("Thêm sản phẩm thành công!");
      document.querySelector(".modal").style.display = "none";
      setDefaultValue();
      displayProducts(); // Cập nhật danh sách sản phẩm
    }
  }
});

// Khởi động hiển thị sản phẩm ban đầu
displayProducts();

function deleteProduct(productId) {
  // Hiển thị thông báo xác nhận
  const confirmation = confirm("Bạn có chắc chắn muốn xóa món ăn này?");

  // Nếu người dùng nhấn "OK", tiếp tục xóa
  if (confirmation) {
    // Lấy danh sách sản phẩm từ localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Lọc sản phẩm để loại bỏ sản phẩm có ID tương ứng
    products = products.filter((product) => product.id !== productId);

    // Cập nhật lại localStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Cập nhật hiển thị sản phẩm
    displayProducts();
  }
}

function uploadImageForEdit(input) {
  console.log("File selected: ", input.files[0]); // Ghi lại tệp đã chọn
  const file = input.files[0]; // Lấy tệp đầu tiên từ input

  if (file) {
    const maxSizeInMB = 5; // Giới hạn kích thước tệp là 2MB
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Chuyển MB thành Bytes

    // Kiểm tra kích thước tệp
    if (file.size > maxSizeInBytes) {
      alert(
        "Dung lượng tệp quá lớn! Vui lòng chọn tệp nhỏ hơn " +
          maxSizeInMB +
          "MB."
      );
      input.value = ""; // Xóa input nếu tệp không hợp lệ
      document.querySelector("#edit-image-preview").setAttribute("src", ""); // Xóa hình ảnh xem trước
      return; // Dừng thực hiện hàm
    }

    let path = input.value; // Lấy giá trị từ phần tử input
    let pathParts = path.split(/\\|\//); // Tách bằng cả dấu "\\" và "/"
    let newPath = "./assets/img/shopping/" + pathParts[pathParts.length - 1]; // Lấy tên tệp
    document.querySelector("#edit-image-preview").setAttribute("src", newPath); // Cập nhật src của hình ảnh xem trước
  }
}

function removeCommas(value) {
  // Xóa tất cả dấu phẩy và dấu chấm
  return value.replace(/[,\.]/g, "");
}

function editProduct(productId) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find((p) => p.id === productId);

  if (product) {
    // Hiển thị thông tin sản phẩm trong modal
    document.getElementById("edit-ten-mon").value = product.product_name;
    document.getElementById("edit-gia").value = removeCommas(
      product.product_price
    );
    document.getElementById("edit-mo-ta").value = product.desc;
    document.getElementById("edit-image-preview").src =
      product.product_image || "../admin/assets/img/shopping/blank-image.png"; // Hình ảnh mặc định nếu không có
    //document.getElementById("edit-chon-mon") = product.topic;
    // Cập nhật loại món ăn
    const categorySelect = document.getElementById("edit-chon-mon");
    categorySelect.value = product.topic; // Lấy loại món ăn từ sản phẩm

    // Lưu ID sản phẩm vào một biến toàn cục để sau này cập nhật
    window.currentEditProductId = productId;

    // Hiện modal
    document.querySelector(".modal.edit-product").style.display = "flex";
  } else {
    console.error("Product not found!");
  }
}

function closeEditModal() {
  document.querySelector(".modal.edit-product").style.display = "none";
}

document
  .getElementById("edit-product-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productIndex = products.findIndex(
      (p) => p.id === window.currentEditProductId
    );

    // Lấy thông tin từ form
    const tenMon = document.getElementById("edit-ten-mon").value;
    const price = document.getElementById("edit-gia").value;
    const moTa = document.getElementById("edit-mo-ta").value;

    // Kiểm tra tính hợp lệ của giá tiền
    if (tenMon === "" || price === "" || moTa === "") {
      alert("Vui lòng nhập đầy đủ thông tin món!");
      return; // Dừng lại nếu có trường rỗng
    }

    if (isNaN(price) || price <= 0 || hasDecimalPoint(price)) {
      alert("Giá phải là một số hợp lệ và lớn hơn 0!");
      return; // Dừng lại nếu giá không hợp lệ
    }

    // Cập nhật thông tin sản phẩm
    products[productIndex].product_name = tenMon;
    products[productIndex].product_price = formatPrice(price); // Nếu bạn đã định dạng giá
    products[productIndex].desc = moTa;

    // Cập nhật loại món ăn
    products[productIndex].topic =
      document.getElementById("edit-chon-mon").value; // Sửa từ category thành topic

    // Cập nhật lại hình ảnh nếu có
    let newImageSrc = getPathImage(
      document.querySelector("#edit-image-preview").src
    );
    products[productIndex].product_image = newImageSrc;

    // Cập nhật lại localStorage
    localStorage.setItem("products", JSON.stringify(products));
    alert("Cập nhật thành công");
    // Đóng modal
    closeEditModal();
    setDefaultValue();
    // Cập nhật hiển thị sản phẩm
    displayProducts();
  });
