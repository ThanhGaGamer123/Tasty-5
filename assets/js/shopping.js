//tao san pham
function createProduct() {
    if (localStorage.getItem('products') == null) {
        let products = [
    {
        id: 1,
        product_name: "Ba chỉ cuộn kim châm",
        product_price: "60.000",
        product_image: "./assets/img/shopping/bachicuonnamkimcham.jpg",
        added_to_cart: false,
        soluong :1,
        topic: 'Heo',
        desc: "Món ba chỉ bò tươi ngon cuộn nấm kim châm, nướng chín mềm với nước sốt đậm đà."
    },
    {
        id: 2,
        product_name: "Bạch tuộc nướng cay",
        product_price: "55.000",
        product_image: "./assets/img/shopping/bachtuocnuongcay.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Hải sản',
        desc: "Bạch tuộc tươi, nướng chín tới cùng gia vị cay nồng, giữ nguyên độ giòn dai hấp dẫn."
    },
    {
        id: 3,
        product_name: "Bánh xèo nướng Hàn Quốc",
        product_price: "35.000",
        product_image: "./assets/img/shopping/banhxeonuongHQ.webp",
        added_to_cart: false,
        soluong :1,
        topic :'Bánh nướng',
        desc: "Bánh xèo Hàn Quốc giòn tan với nhân hải sản, rau củ, và lớp vỏ vàng ruộm."
    },
    {
        id: 4,
        product_name: "Bạch tuộc nướng phô mai",
        product_price: "57.000",
        product_image: "./assets/img/shopping/bachtuocnuongphomai.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Hải sản',
        desc: "Bạch tuộc tươi kết hợp với lớp phô mai béo ngậy, tạo nên sự hòa quyện độc đáo."
    },
    {
        id: 5,
        product_name: "Bò nướng muối ớt",
        product_price: "45.000",
        product_image: "./assets/img/shopping/bonuongmuoiot.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Bò',
        desc: "Thịt bò mềm nướng cùng muối ớt đậm đà, cay nhẹ, vừa miệng."
    },
    {
        id: 6,
        product_name: "Bò cuộn lá lốt",
        product_price: "30.000",
        product_image: "./assets/img/shopping/bocuonlalot.png",
        added_to_cart: false,
        soluong :1,
        topic :'Bò',
        desc: "Thịt bò thơm ngon cuộn lá lốt, nướng trên lửa than, giữ trọn hương vị dân dã."
    },
    {
        id: 7,
        product_name: "Cá mú nướng giấy bạc",
        product_price: "40.000",
        product_image: "./assets/img/shopping/camunuonggiaybac.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Hải sản',
        desc: "Cá mú tươi được nướng trong giấy bạc cùng gia vị, giữ trọn vị ngọt tự nhiên."
    },
    {
        id: 8,
        product_name: "Cánh gà nướng mật ong",
        product_price: "34.000",
        product_image: "./assets/img/shopping/canhganuongmatong.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Gà',
        desc: "Cánh gà được ướp mật ong và gia vị, nướng vàng óng, thơm ngọt quyến rũ."
    },
    {
        id: 9,
        product_name: "Đuôi heo nướng sả",
        product_price: "37.000",
        product_image: "./assets/img/shopping/duoiheonuongxaot.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Heo',
        desc: "Đuôi heo được ướp sả thơm lừng, nướng vàng giòn, vị béo ngậy hấp dẫn."
    },
    {
        id: 10,
        product_name: "Gyu-kushi-xiên bò",
        product_price: "55.000",
        product_image: "./assets/img/shopping/gyu-kushi.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Bò',
        desc: "Xiên bò kiểu Nhật nướng trên than hoa, giữ trọn vị ngon mềm và gia vị đặc trưng."
    },
    {
        id: 11,
        product_name: "Mực nướng vị Hàn",
        product_price: "43.000",
        product_image: "./assets/img/shopping/muc_nuongHQ.webp",
        added_to_cart: false,
        soluong :1,
        topic :'Hải sản',
        desc: "Mực tươi nướng với gia vị Hàn Quốc, đậm đà, cay nhẹ, hương vị khó quên."
    },
    {
        id: 12,
        product_name: "Sườn cừu",
        product_price: "75.000",
        product_image: "./assets/img/shopping/suon_cuu.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Dê,cừu',
        desc: "Sườn cừu nướng mềm, ướp gia vị đặc biệt, thơm ngon và bổ dưỡng."
    },
    {
        id: 13,
        product_name: "Sườn bò nướng",
        product_price: "65.000",
        product_image: "./assets/img/shopping/suonbonuong.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Bò',
        desc: "Sườn bò nướng chín mềm, ướp gia vị đậm đà, thơm lừng."
    },
    {
        id: 14,
        product_name: "Thịt dê nướng",
        product_price: "57.000",
        product_image: "./assets/img/shopping/thitdenuong.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Dê,cừu',
        desc: "Thịt dê tươi nướng trên lửa hồng, giữ được vị thơm ngon, hấp dẫn."
    },
    {
        id: 15,
        product_name: "Thịt gà nướng cay",
        product_price: "38.000",
        product_image: "./assets/img/shopping/thitganuongcay.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Gà',
        desc: "Gà nướng với gia vị cay nồng, thơm lừng, thích hợp cho những ai yêu thích món cay."
    },
    {
        id: 16,
        product_name: "Thịt heo nướng sa tế",
        product_price: "46.000",
        product_image: "./assets/img/shopping/thitheonuongsate.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Heo',
        desc: "Thịt heo nướng sa tế cay nồng, thơm lừng, ăn kèm rau sống."
    },
    {
        id: 17,
        product_name: "Tôm nướng mỡ hành",
        product_price: "45.000",
        product_image: "./assets/img/shopping/tom_nuong.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Hải sản',
        desc: "Tôm nướng với mỡ hành béo ngậy, giữ trọn vị ngọt của tôm tươi."
    },
    {
        id: 18,
        product_name: "Tôm nướng phô mai",
        product_price: "67.000",
        product_image: "./assets/img/shopping/tomnuongphomai.jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Hải sản',
        desc: "Tôm nướng kết hợp phô mai tan chảy, tạo nên món ăn độc đáo."
    },
    {
        id: 19,
        product_name: "Yakitori",
        product_price: "47.000",
        product_image: "./assets/img/shopping/yakitori_ga(nhatban).jpg",
        added_to_cart: false,
        soluong :1,
        topic :'Gà',
        desc: "Món xiên gà nướng kiểu Nhật, tẩm gia vị đậm đà, thích hợp làm món khai vị."
    },
    {
        id: 20,
        product_name: "Salad rau ăn kèm",
        product_price: "5.000",
        product_image: "./assets/img/shopping/saladrau.jpg",
        added_to_cart: false,
        soluong :1, 
        topic :'Rau',
        desc: "Salad tươi mát từ các loại rau sống, dùng để ăn kèm với các món nướng."
    }
];


        localStorage.setItem("products", JSON.stringify(products));

}

}
createProduct();

//     <img class="img-pro" src="${product.product_image}" alt="${product.product_name}"></img> 



// hiển thị sản phẩm 
let currentPage = 1;
const soLuongSpPerPage = 9;
function displayProducts(filteredProducts = null) {
    let productList = document.getElementById("product-list");
    let products = filteredProducts || JSON.parse(localStorage.getItem('products'));

    if (products && products.length > 0) {
        productList.innerHTML = "";

        // tính toán vị trí bắt đầu , kết thuc page 
        const startIndex = (currentPage - 1) * soLuongSpPerPage;
        const endIndex = startIndex + soLuongSpPerPage;
        const paginatedProducts = products.slice(startIndex, endIndex);
 
        // tạo HTML cho từng sp
        paginatedProducts.forEach(product => {
            let productItem = document.createElement("div");
            productItem.classList.add("product-item");
            productItem.innerHTML = `
                <div class="product-card">
                    <div class="product-image">
                 



                    <img class="img-pro" src="${product.product_image}" alt="${product.product_name}" onclick="showProductDetail(${product.id})">

              


                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.product_name}</h3>
                        <p class="product-price">${product.product_price} VND</p>
                        <p class="product-desc">${product.desc}</p>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            ${product.added_to_cart ? "Đã thêm vào giỏ~~~" : "Thêm vào giỏ hàng"}
                        </button>
                    </div>
                </div>
            `;
            productList.appendChild(productItem);
        });


        Dieukhienpage(products.length);
    } else {
        productList.innerHTML = "<p>Không có sản phẩm nào để hiển thị.</p>";
    }
}

// phần phân trang sản phẩm
function Dieukhienpage(totalProducts) {
    const phanTrangSp = document.getElementById("pagination");
    phanTrangSp.innerHTML = ""; 

    const totalPages = Math.ceil(totalProducts / soLuongSpPerPage);

    // trang trước
    if (currentPage > 1) {
        const prevButton = document.createElement("button");
        prevButton.innerText = "trang trước";
        prevButton.onclick = () => {
            currentPage--;
            displayProducts();
        };
        phanTrangSp.appendChild(prevButton);
    }

    // số trang 
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.onclick = () => {
            currentPage = i;
            displayProducts();
        };
        if (i === currentPage) {
            pageButton.disabled = true;
        }
        phanTrangSp.appendChild(pageButton);
    }

    // trang sau
    if (currentPage < totalPages) {
        const nextButton = document.createElement("button");
        nextButton.innerText = "trang sau";
        nextButton.onclick = () => {
            currentPage++;
            displayProducts();
        };
        phanTrangSp.appendChild(nextButton);
    }
}
displayProducts();

//phần thêm sản phẩm vào giỏ hàng 
function addToCart(productId) {
    let products = JSON.parse(localStorage.getItem('products'));

    // Tìm sản phẩm theo ID
    let product = products.find(p => p.id === productId);

    if (product) {
        // Kiểm tra trạng thái của sản phẩm
        if (!product.added_to_cart) {
            product.added_to_cart = true;
            alert(`${product.product_name} đã được thêm vào giỏ hàng!`);
        } else {
            product.added_to_cart = false;
            alert(`${product.product_name} đã được gỡ khỏi giỏ hàng!`);
        }
        localStorage.setItem('products', JSON.stringify(products));

         displayProducts(); 
    }
}


// Tìm kiếm và lọc sản phẩm
function Timkiemsanpham() {
    const searchInput = document.querySelector(".search-filter__input").value.toLowerCase();
    const selectedTopic = document.querySelector(".search-filter__select").value;

    // Lấy danh sách sản phẩm từ localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Lọc sản phẩm dựa trên tìm kiếm và danh mục
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.product_name.toLowerCase().includes(searchInput);
        const matchesTopic = selectedTopic ? product.topic === selectedTopic : true;
        return matchesSearch && matchesTopic;
    });

    currentPage = 1; // Reset lại trang hiện tại
    Hienthisanphamtimkiem(filteredProducts); // Hiển thị sản phẩm đã lọc
}

// Hiển thị sản phẩm đã lọc
function Hienthisanphamtimkiem(products) {
    let productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Xóa danh sách sản phẩm cũ

    if (products.length > 0) {
        // Tạo danh sách sản phẩm từ mảng đã lọc
        products.forEach(product => {
            let productItem = document.createElement("div");
            productItem.classList.add("product-item");
            productItem.innerHTML = `
                <div class="product-card">
                    <div class="product-image">
                        <img class="img-pro" src="${product.product_image}" alt="${product.product_name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.product_name}</h3>
                        <p class="product-price">${product.product_price} VND</p>
                        <p class="product-desc">${product.desc}</p>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            ${product.added_to_cart ? "Đã thêm vào giỏ~~~" : "Thêm vào giỏ hàng"}
                        </button>
                    </div>
                </div>
            `;
            productList.appendChild(productItem);
        });
    } else {
        productList.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
    }
}
document.querySelector(".search-filter__button").addEventListener("click", Timkiemsanpham);
displayProducts();


//  chi tiết sản phẩm 
function showProductDetail(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);

    if (product) {
        // Nếu modal đã tồn tại, xóa nó để tạo lại
        let existingModal = document.getElementById("product-detail-modal");
        if (existingModal) {
            existingModal.remove();
        }

        // Tạo modal container
        const modal = document.createElement("div");
        modal.id = "product-detail-modal";
        modal.classList.add("modal");

        // Tạo nội dung của modal                                      &time; là dấu x đóng phần hiển thị sp
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn" onclick="closeProductDetail()">&times;</span>
                <div class="product-detail">
                    <img id="detail-product-image" src="${product.product_image}" alt="${product.product_name}">
                    <h2 id="detail-product-name">${product.product_name}</h2>
                    <p id="detail-product-price">${product.product_price} VND</p>
                    <p id="detail-product-desc">${product.desc}</p>
                    <div class="quantity-control">
                        <button class="btnDescAdd-Sub" onclick="decreaseQuantity()">-</button>
                        <input id="detail-product-quantity" type="number" value="${product.soluong}" min="1">
                        <button class="btnDescAdd-Sub" onclick="increaseQuantity()">+</button>
                    </div>
                    <button id="add-to-cart-detail-btn">
                        ${product.added_to_cart ? "Đã thêm vào giỏ~~~" : "Thêm vào giỏ hàng"}
                    </button>
                </div>
            </div>
        `;

        // Gắn sự kiện thêm vào giỏ hàng
        modal.querySelector("#add-to-cart-detail-btn").onclick = function () {
            addToCart(productId);
        };

        // Gắn modal vào body
        document.body.appendChild(modal);

        // Hiển thị modal
        modal.classList.remove("hidden");
    }
}

// Đóng modal chi tiết sản phẩm
function closeProductDetail() {
    const modal = document.getElementById("product-detail-modal");
    if (modal) {
        modal.remove();
    }
}

// Hàm tăng/giảm số lượng
function increaseQuantity() {
    const quantityInput = document.getElementById("detail-product-quantity");
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById("detail-product-quantity");
    if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

increaseQuantity();

decreaseQuantity();



