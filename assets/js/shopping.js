
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
        topic :'Gà',
        desc: "Cánh gà được ướp mật ong và gia vị, nướng vàng óng, thơm ngọt quyến rũ."
    },
    {
        id: 9,
        product_name: "Đuôi heo nướng sả",
        product_price: "37.000",
        product_image: "./assets/img/shopping/duoiheonuongxaot.jpg",
        added_to_cart: false,
        topic :'Heo',
        desc: "Đuôi heo được ướp sả thơm lừng, nướng vàng giòn, vị béo ngậy hấp dẫn."
    },
    {
        id: 10,
        product_name: "Gyu-kushi-xiên bò",
        product_price: "55.000",
        product_image: "./assets/img/shopping/gyu-kushi.jpg",
        added_to_cart: false,
        topic :'Bò',
        desc: "Xiên bò kiểu Nhật nướng trên than hoa, giữ trọn vị ngon mềm và gia vị đặc trưng."
    },
    {
        id: 11,
        product_name: "Mực nướng vị Hàn",
        product_price: "43.000",
        product_image: "./assets/img/shopping/muc_nuongHQ.webp",
        added_to_cart: false,
        topic :'Hải sản',
        desc: "Mực tươi nướng với gia vị Hàn Quốc, đậm đà, cay nhẹ, hương vị khó quên."
    },
    {
        id: 12,
        product_name: "Sườn cừu",
        product_price: "75.000",
        product_image: "./assets/img/shopping/suon_cuu.jpg",
        added_to_cart: false,
        topic :'Dê,cừu',
        desc: "Sườn cừu nướng mềm, ướp gia vị đặc biệt, thơm ngon và bổ dưỡng."
    },
    {
        id: 13,
        product_name: "Sườn bò nướng",
        product_price: "65.000",
        product_image: "./assets/img/shopping/suonbonuong.jpg",
        added_to_cart: false,
        topic :'Bò',
        desc: "Sườn bò nướng chín mềm, ướp gia vị đậm đà, thơm lừng."
    },
    {
        id: 14,
        product_name: "Thịt dê nướng",
        product_price: "57.000",
        product_image: "./assets/img/shopping/thitdenuong.jpg",
        added_to_cart: false,
        topic :'Dê cừu',
        desc: "Thịt dê tươi nướng trên lửa hồng, giữ được vị thơm ngon, hấp dẫn."
    },
    {
        id: 15,
        product_name: "Thịt gà nướng cay",
        product_price: "38.000",
        product_image: "./assets/img/shopping/thitganuongcay.jpg",
        added_to_cart: false,
        topic :'Gà',
        desc: "Gà nướng với gia vị cay nồng, thơm lừng, thích hợp cho những ai yêu thích món cay."
    },
    {
        id: 16,
        product_name: "Thịt heo nướng sa tế",
        product_price: "46.000",
        product_image: "./assets/img/shopping/thitheonuongsate.jpg",
        added_to_cart: false,
        topic :'Heo',
        desc: "Thịt heo nướng sa tế cay nồng, thơm lừng, ăn kèm rau sống."
    },
    {
        id: 17,
        product_name: "Tôm nướng mỡ hành",
        product_price: "45.000",
        product_image: "./assets/img/shopping/tom_nuong.jpg",
        added_to_cart: false,
        topic :'Hải sản',
        desc: "Tôm nướng với mỡ hành béo ngậy, giữ trọn vị ngọt của tôm tươi."
    },
    {
        id: 18,
        product_name: "Tôm nướng phô mai",
        product_price: "67.000",
        product_image: "./assets/img/shopping/tomnuongphomai.jpg",
        added_to_cart: false,
        topic :'Hải sản',
        desc: "Tôm nướng kết hợp phô mai tan chảy, tạo nên món ăn độc đáo."
    },
    {
        id: 19,
        product_name: "Yakitori",
        product_price: "47.000",
        product_image: "./assets/img/shopping/yakitori_ga(nhatban).jpg",
        added_to_cart: false,
        topic :'Gà',
        desc: "Món xiên gà nướng kiểu Nhật, tẩm gia vị đậm đà, thích hợp làm món khai vị."
    },
    {
        id: 20,
        product_name: "Salad rau ăn kèm",
        product_price: "5.000",
        product_image: "./assets/img/shopping/saladrau.jpg",
        added_to_cart: false,
        topic :'Rau',
        desc: "Salad tươi mát từ các loại rau sống, dùng để ăn kèm với các món nướng."
    }
];


        localStorage.setItem("products", JSON.stringify(products));

}

}

createProduct();



function displayProducts() {
    let productList = document.getElementById("product-list");

    // Lấy dữ liệu từ localStorage
    let products = JSON.parse(localStorage.getItem('products'));

    // Kiểm tra nếu có sản phẩm trong localStorage
    if (products && products.length > 0) {
        // Xóa nội dung cũ của danh sách sản phẩm (nếu có)
        productList.innerHTML = "";

        // Duyệt qua từng sản phẩm và tạo HTML
        products.forEach(product => {
            let productItem = document.createElement("div");
            productItem.classList.add("product-item");

            // Tạo nội dung HTML cho mỗi sản phẩm
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
                            ${product.added_to_cart ? "Đã thêm vào giỏ" : "Thêm vào giỏ hàng"}
                                </button>


                    </div>

                </div>
            `;

            // Thêm sản phẩm vào danh sách
            productList.appendChild(productItem);
        });
    } else {
        // Hiển thị thông báo nếu không có sản phẩm
        productList.innerHTML = "<p>Không có sản phẩm nào để hiển thị.</p>";
    }
}

displayProducts();



function addToCart(productId) {
    // Lấy danh sách sản phẩm từ localStorage
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

        // Cập nhật lại localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Cập nhật lại danh sách hiển thị
         displayProducts(); 
    }
}


