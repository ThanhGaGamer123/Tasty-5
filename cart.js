document.addEventListener("DOMContentLoaded", function () {
    const increaseButtons = document.querySelectorAll(".increase");
    const decreaseButtons = document.querySelectorAll(".decrease");
    const totalPriceElement = document.getElementById("total-price");
  
    let totalPrice = 0;
  
    increaseButtons.forEach((button) =>
      button.addEventListener("click", function () {
        const quantityElement = this.previousElementSibling;
        const priceElement = this.closest(".menu-info").querySelector(".item-price");
        const price = parseInt(priceElement.textContent) || 0;
  
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
  
        totalPrice += price;
        totalPriceElement.textContent = totalPrice.toLocaleString();
      })
    );
  
    decreaseButtons.forEach((button) =>
      button.addEventListener("click", function () {
        const quantityElement = this.nextElementSibling;
        const priceElement = this.closest(".menu-info").querySelector(".item-price");
        const price = parseInt(priceElement.textContent) || 0;
  
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 0) {
          quantity--;
          quantityElement.textContent = quantity;
  
          totalPrice -= price;
          totalPriceElement.textContent = totalPrice.toLocaleString();
        }
      })
    );
  
    document.querySelector(".payment-btn").addEventListener("click", function () {
      alert("Thanh toán thành công! Tổng tiền: " + totalPrice.toLocaleString() + " VND" + "\nCảm ơn quý khách!!!");
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const increaseButtons = document.querySelectorAll(".increase");
    const decreaseButtons = document.querySelectorAll(".decrease");
    const totalPriceElement = document.getElementById("total-price");
    const paymentMethodInputs = document.querySelectorAll('input[name="payment-method"]');
    const creditCardSection = document.querySelector(".credit-card-section");
    const paymentButton = document.querySelector(".payment-btn");
  
    let totalPrice = 0;
  
    // Handle quantity increase
    increaseButtons.forEach((button) =>
      button.addEventListener("click", function () {
        const quantityElement = this.previousElementSibling;
        const priceElement = this.closest(".menu-info").querySelector(".item-price");
        const price = parseInt(priceElement.textContent) || 0;
  
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
  
        totalPrice += price;
        totalPriceElement.textContent = totalPrice.toLocaleString();
      })
    );
  
    // Handle quantity decrease
    decreaseButtons.forEach((button) =>
      button.addEventListener("click", function () {
        const quantityElement = this.nextElementSibling;
        const priceElement = this.closest(".menu-info").querySelector(".item-price");
        const price = parseInt(priceElement.textContent) || 0;
  
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 0) {
          quantity--;
          quantityElement.textContent = quantity;
  
          totalPrice -= price;
          totalPriceElement.textContent = totalPrice.toLocaleString();
        }
      })
    );
  
    // Toggle credit card section
    paymentMethodInputs.forEach((input) =>
      input.addEventListener("change", function () {
        if (this.value === "credit-card") {
          creditCardSection.style.display = "block";
        } else {
          creditCardSection.style.display = "none";
        }
      })
    );
  
    // Handle payment button
    paymentButton.addEventListener("click", function () {
      const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
  
      if (selectedMethod === "credit-card") {
        const cardNumber = document.getElementById("card-number").value;
        const cardExpiry = document.getElementById("card-expiry").value;
        const cardCVV = document.getElementById("card-cvv").value;
  
        if (!cardNumber || !cardExpiry || !cardCVV) {
          alert("Vui lòng nhập đầy đủ thông tin thẻ!");
          return;
        }
      }
  
      alert("Thanh toán thành công! Phương thức: " + selectedMethod.toUpperCase() + "\nTổng tiền: " + totalPrice.toLocaleString() + " VND\nCảm ơn quý khách!!!");
    });
  });
  
