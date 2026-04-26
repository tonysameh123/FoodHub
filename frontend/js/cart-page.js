function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-container');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h2>🛒 Your cart is empty</h2>
        <a href="products.html" class="btn-primary">Browse Menu</a>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="cart-list">
      ${cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>${item.price} EGP</p>
          </div>
          <div class="qty-control">
            <button onclick="changeCartQty('${item._id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeCartQty('${item._id}', 1)">+</button>
          </div>
          <p class="subtotal">${item.price * item.quantity} EGP</p>
          <button class="remove-btn" onclick="removeItem('${item._id}')">🗑️</button>
        </div>
      `).join('')}
    </div>
    <div class="cart-summary">
      <h3>Total: <span>${getCartTotal()} EGP</span></h3>
      <a href="checkout.html" class="btn-primary big">Proceed to Checkout</a>
    </div>
  `;
}

function changeCartQty(id, delta) {
  const item = getCart().find(i => i._id === id);
  if (item) {
    updateQuantity(id, item.quantity + delta);
    renderCart();
  }
}

function removeItem(id) {
  removeFromCart(id);
  renderCart();
}

renderCart();