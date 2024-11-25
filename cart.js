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
      alert("Thanh toán thành công! Tổng tiền: " + totalPrice.toLocaleString() + " VND");
    });
  });
  