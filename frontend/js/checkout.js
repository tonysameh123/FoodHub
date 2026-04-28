const cart = getCart();

// Pre-fill if logged in
if (isLoggedIn()) {
  const user = getUser();
  document.getElementById('name').value = user.name || '';
}

// Render summary
const summary = document.getElementById('order-summary');
if (cart.length === 0) {
  summary.innerHTML = '<p>Your cart is empty. <a href="products.html">Add items</a></p>';
} else {
  summary.innerHTML = `
    <h3>Order Summary</h3>
    ${cart.map(i => `
      <div class="summary-item">
        <span>${i.name} x${i.quantity}</span>
        <span>${i.price * i.quantity} EGP</span>
      </div>
    `).join('')}
    <hr>
    <div class="summary-item"><span>Subtotal</span><span>${getCartTotal()} EGP</span></div>
    <div class="summary-item"><span>Delivery</span><span>30 EGP</span></div>
    <div class="summary-item total"><span>Total</span><span>${getCartTotal() + 30} EGP</span></div>
  `;
}

// Submit order
document.getElementById('checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert('Cart is empty!');
    return;
  }

  if (!isLoggedIn()) {
    alert('Please login first!');
    window.location.href = 'login.html';
    return;
  }

  const orderData = {
    items: cart.map(item => ({
      product: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    })),
    totalPrice: getCartTotal() + 20,
    deliveryAddress: document.getElementById('address').value,
    phone: document.getElementById('phone').value,
    paymentMethod: document.querySelector('input[name="payment"]:checked').value
  };

  try {
    const order = await apiCreateOrder(orderData);
    alert('🎉 Order placed successfully!\n\nOrder ID: ' + order._id);
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
