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
            // hiển thị sản phẩm 
let currentPage = 1;
const soLuongSpPerPage = 9;
function displayProducts(filteredProducts = null) {
    let productList = document.getElementById("product-list");
    let products = filteredProducts || JSON.parse(localStorage.getItem('products'));

    if (products && products.length > 0) {
        productList.innerHTML = "";

        // Tính toán vị trí bắt đầu, kết thúc page
        const startIndex = (currentPage - 1) * soLuongSpPerPage;
        const endIndex = startIndex + soLuongSpPerPage;
        const paginatedProducts = products.slice(startIndex, endIndex);

        // Tạo HTML cho từng sản phẩm
        paginatedProducts.forEach(product => {
            let productItem = document.createElement("div");
            productItem.classList.add("product-item");
            productItem.innerHTML = `
                <div class="product-card">
                    <div class="product-image">
                        <img class="img-pro" src="${product.product_image}" alt="${product.product_name}" onclick="chiTietSanPham(${product.id})">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.product_name}</h3>
                        <p class="product-price">${product.product_price} VND</p>
                        <p class="product-desc">${product.desc}</p>
                        <button class="add-to-cart-btn" onclick="tangGiamSp(${product.id})">
                            ${isProductInCart(product.id) ? "Đã thêm vào giỏ ~~~" : "Thêm vào giỏ hàng"}
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
            // Hàm kiểm tra sản phẩm đã nằm trong giỏ hàng
function isProductInCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.some(item => item.id === productId);
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
            // Tìm kiếm và lọc sản phẩm

            /** 
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
}*/
function Timkiemsanpham() {
    const searchInput = document.querySelector(".search-filter__input").value.toLowerCase();
    const selectedTopic = document.querySelector(".search-filter__select").value;

    let products = JSON.parse(localStorage.getItem('products')) || [];
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.product_name.toLowerCase().includes(searchInput);
        const matchesTopic = selectedTopic ? product.topic === selectedTopic : true;
        return matchesSearch && matchesTopic;
    });

    currentPage = 1; // Reset trang hiện tại
    displayProducts(filteredProducts); // Hiển thị kết quả với phân trang
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
function chiTietSanPham(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    if (product) {
        let existingModal = document.getElementById("product-detail-modal");
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement("div");
        modal.id = "product-detail-modal";
        modal.classList.add("modal");

        // Tạo nội dung của modal                                     
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn" onclick="closeProductDetail()">&times;</span>
                <div class="product-detail">
                    <img id="detail-product-image" src="${product.product_image}" alt="${product.product_name}">
                    <h2 id="detail-product-name">${product.product_name}</h2>
                    <p id="detail-product-price">${product.product_price} VND</p>
                    <p id="detail-product-desc">${product.desc}</p>
                    <div class="quantity-control">
                        <button class="btnDescAdd-Sub" onclick="nhapSoluongSp(${productId}, 'decrease')">-</button>
                        <input id="detail-product-quantity" type="number" value="1" min="1" onchange="nhapSoluongSp(${productId}, 'input')">
                        <button class="btnDescAdd-Sub" onclick="nhapSoluongSp(${productId}, 'increase')">+</button>
                    </div>
                    <button id="add-to-cart-detail-btn">Thêm vào giỏ theo số lượng này ~~</button>
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
/**
function nhapSoluongSp(productId, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || ['xuanthien'];

    // Tìm sản phẩm trong giỏ hàng
    let cartItem = cart.find(item => item.id === productId);
    if (!cartItem) return; // Nếu sản phẩm không có trong giỏ hàng, thoát

    const quantityInput = document.getElementById("detail-product-quantity");
    if (action === 'increase') {
        cartItem.soluong += 1;
        quantityInput.value = cartItem.soluong; 
    } else if (action === 'decrease' && cartItem.soluong > 1) {
        cartItem.soluong -= 1;
        quantityInput.value = cartItem.soluong;
    } else if (action === 'input') {
        const newQuantity = parseInt(quantityInput.value);
        if (newQuantity > 0) {
            cartItem.soluong = newQuantity;
        } else {
            quantityInput.value = cartItem.soluong; // Reset về giá trị cũ nếu nhập không hợp lệ
        }
    }
    // Cập nhật lại giỏ hàng trong Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));
}
 */

/**

function nhapSoluongSp(productId, action) {
    let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
    const loginUser = JSON.parse(localStorage.getItem('LoginUser'));

    if (!loginUser || !loginUser.email) {
        alert("Bạn cần đăng nhập để thay đổi số lượng sản phẩm!");
        return;
    }

    let userCart = cartArray.find(cart => cart.buyer.email === loginUser.email);
    if (!userCart) return; // Nếu không có giỏ hàng, thoát

    // Tìm sản phẩm trong giỏ hàng
    let cartItem = userCart.cart.find(item => item.id === productId);
    if (!cartItem) return; // Nếu sản phẩm không tồn tại, thoát

    const quantityInput = document.getElementById("detail-product-quantity");
    if (action === 'increase') {
        cartItem.soluong += 1;
        quantityInput.value = cartItem.soluong;
    } else if (action === 'decrease' && cartItem.soluong > 1) {
        cartItem.soluong -= 1;
        quantityInput.value = cartItem.soluong;
    } else if (action === 'input') {
        const newQuantity = parseInt(quantityInput.value);
        if (newQuantity > 0) {
            cartItem.soluong = newQuantity;
        } else {
            quantityInput.value = cartItem.soluong; // Reset giá trị cũ nếu nhập không hợp lệ
        }
    }

    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
}
 */

function nhapSoluongSp(productId, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || ['xuanthien'];

    // Tìm sản phẩm trong giỏ hàng
    let cartItem = cart.find(item => item.id === productId);
    if (!cartItem) return; // Nếu sản phẩm không có trong giỏ hàng, thoát

    const quantityInput = document.getElementById("detail-product-quantity");
    if (action === 'increase') {
        cartItem.soluong += 1;
        quantityInput.value = cartItem.soluong; 
    } else if (action === 'decrease' && cartItem.soluong > 1) {
        cartItem.soluong -= 1;
        quantityInput.value = cartItem.soluong;
    } else if (action === 'input') {
        const newQuantity = parseInt(quantityInput.value);
        if (newQuantity > 0) {
            cartItem.soluong = newQuantity;
        } else {
            quantityInput.value = cartItem.soluong; // Reset về giá trị cũ nếu nhập không hợp lệ
        }
    }
    // Cập nhật lại giỏ hàng trong Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));
}



//ham fail
/** 
function tangGiamSp(productId) {
    let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];

    // Kiểm tra người dùng đã đăng nhập hay chưa
    const loginUser = JSON.parse(localStorage.getItem('LoginUser'));
    if (!loginUser || !loginUser.email) {
        alert("Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng!");
        return;
    }

    // Tìm giỏ hàng của người dùng đăng nhập
    let userCart = cartArray.find(cart => cart.buyer.email === loginUser.email);
    if (!userCart) {
        // Nếu chưa có giỏ hàng, tạo giỏ hàng mới
        userCart = {
            buyer: {
                name: loginUser.name || "Người dùng",
                email: loginUser.email,
                phone: loginUser.phone || "Chưa có số điện thoại"
            },
            cart: []
        };
        cartArray.push(userCart);
    }

    // Tìm sản phẩm trong giỏ hàng
    let cartItemIndex = userCart.cart.findIndex(item => item.id === productId);
    if (cartItemIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, xóa khỏi giỏ hàng
        userCart.cart.splice(cartItemIndex, 1);
        alert("Sản phẩm đã được gỡ khỏi giỏ hàng!");
    } else {
        // Nếu sản phẩm chưa tồn tại, thêm vào giỏ
        let products = JSON.parse(localStorage.getItem('products')) || [];
        let product = products.find(p => p.id === productId);
        if (product) {
            userCart.cart.push({
                id: product.id,
                product_name: product.product_name,
                product_price: product.product_price,
                product_image: product.product_image,
                soluong: 1
            });
            alert("Sản phẩm đã được thêm vào giỏ hàng!");
        }
    }

    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
    updateCartButton(productId);
}
*/

function copyCartToArray() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Tạo một mảng mới cartArray
    let cartArray = [];

    // Sao chép từng sản phẩm từ cart vào cartArray
    cart.forEach(item => {
        cartArray.push({ ...item }); // Sử dụng spread operator để sao chép
    });

    localStorage.setItem('cartArray', JSON.stringify(cartArray));
}


function tangGiamSp(productId) {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // kiêm tra ng dùng đăng nhập chưa 
    const loginUser = JSON.parse(localStorage.getItem('LoginUser'));
    if (!loginUser || !loginUser.email) {
        // nếu chưa
        alert("Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng!");
        return; 
    }

        // nếu rồi
    if (cart.length === 0) {
        cart.push({ customerInfo: loginUser }); 
    }

    // kiểm tra sản phẩm thêm vào giỏ
    let cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex !== -1) {
        // lấy sản phẩm ra khỏi giỏ
        cart.splice(cartItemIndex, 1);
        alert("Sản phẩm đã được gỡ khỏi giỏ hàng!");
    } else {
        // thêm ---
        let products = JSON.parse(localStorage.getItem('products')) || [];
        let product = products.find(p => p.id === productId);
        if (product) {
            // thêm sản phẩm vào cart
            cart.push({
                id: product.id,
                product_name: product.product_name,
                product_price: product.product_price,
                product_image: product.product_image,
                soluong: 1, //nếu chỉ bấm thêm thì sẽ là 1 sp
            });
            alert("Sản phẩm đã được thêm vào giỏ hàng!");
        }
    }


    localStorage.setItem('cart', JSON.stringify(cart));
    copyCartToArray();

    updateCartButton(productId);





}   


function updateCartButton(productId) {
    const button = document.querySelector(`.add-to-cart-btn[onclick="tangGiamSp(${productId})"]`);
    if (button) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isInCart = cart.some(item => item.id === productId);

        if (isInCart) {
            button.innerText = "Đã thêm vào giỏ~~~";
            button.classList.add("in-cart"); // Thêm class để tùy chỉnh giao diện
        } else {
            button.innerText = "Thêm vào giỏ hàng";
            button.classList.remove("in-cart"); // Xóa class nếu không còn trong giỏ
        }
    }
}
 
function resetProductQuantities() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => product.soluong = 1);
    localStorage.setItem('products', JSON.stringify(products));
}

// Hàm cập nhật nút


/** 
function updateCartButton(productId) {
    const button = document.querySelector(`.add-to-cart-btn[data-product-id="${productId}"]`);
    if (!button) {
      console.error(`Button with productId ${productId} not found!`);
      return;
    }
  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isInCart = cart.some(item => item.id === productId);
  
    if (isInCart) {
      button.innerText = "Đã thêm vào giỏ~~~";
      button.classList.add("in-cart");
    } else {
      button.innerText = "Thêm vào giỏ hàng";
      button.classList.remove("in-cart");
    }
  }
  */
  // Hàm thêm sản phẩm vào giỏ
  function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.some(item => item.id === productId)) {
      cart.push({ id: productId });
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartButton(productId);
    }
  }
  

// Cập nhật nút khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => updateCartButton(item.id));
});


