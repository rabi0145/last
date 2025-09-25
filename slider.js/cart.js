function updateCart() {
  let subtotal = 0;
  const cartItems = document.querySelectorAll(".cart-item");

  cartItems.forEach(item => {
    const price = parseFloat(item.dataset.price);
    const qty = parseInt(item.querySelector(".qty").value);
    const itemTotal = price * qty;
    item.querySelector(".item-total").innerText = `$${itemTotal}`;
    subtotal += itemTotal;
  });

  document.getElementById("subtotal").innerText = `$${subtotal}`;
  const delivery = 4;
  document.getElementById("delivery").innerText = `$${delivery}`;
  document.getElementById("total").innerText = `$${subtotal + delivery}`;
}

// Quantity change
document.querySelectorAll(".qty").forEach(input => {
  input.addEventListener("change", updateCart);
});

// Remove item
document.querySelectorAll(".remove-btn").forEach(button => {
  button.addEventListener("click", function () {
    this.parentElement.remove();
    updateCart();
  });
});

updateCart(); // Initial load
