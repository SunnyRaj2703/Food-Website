// ---------- Selectors ----------
const orderButtons = document.querySelectorAll(".menu_btn");
const cartCount = document.getElementById("cart-count");
const cartPanel = document.getElementById("cart-panel");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");
const cartIcon = document.querySelector(".cart-icon");

// ---------- Cart Data ----------
let cart = [];

// ---------- Toggle Cart Visibility ----------
cartIcon.addEventListener("click", () => {
  cartPanel.classList.toggle("hidden");
});

// ---------- Add to Cart ----------
orderButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const menuCard = e.target.closest(".menu_card");
    const itemName = menuCard.querySelector("h2").innerText;
    const itemPrice = parseFloat(
      menuCard.querySelector("h3").innerText.replace("$", "")
    );

    // check if already exists
    const existing = cart.find((item) => item.name === itemName);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name: itemName, price: itemPrice, qty: 1 });
    }

    updateCart();
  });
});

// ---------- Update Cart ----------
function updateCart() {
  // count
  let totalItems = 0;
  let totalPrice = 0;
  cartItemsList.innerHTML = "";

  cart.forEach((item) => {
    totalItems += item.qty;
    totalPrice += item.price * item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
    `;
    cartItemsList.appendChild(li);
  });

  cartCount.innerText = totalItems;
  cartTotal.innerText = `Total: $${totalPrice.toFixed(2)}`;

  if (cart.length === 0) {
    cartItemsList.innerHTML = "<li>Your cart is empty</li>";
  }
}

// ---------- Clear Cart ----------
clearCartBtn.addEventListener("click", () => {
  cart = [];
  updateCart();
});
