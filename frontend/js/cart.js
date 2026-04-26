function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item._id === product._id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ ...product, quantity: qty });
  }
  saveCart(cart);
  showToast('✅ Added to cart!');
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item._id !== productId);
  saveCart(cart);
}

function updateQuantity(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i._id === productId);
  if (item) {
    item.quantity = qty;
    if (item.quantity <= 0) removeFromCart(productId);
    else saveCart(cart);
  }
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  const el = document.getElementById('cart-count');
  if (el) el.textContent = count;
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

document.addEventListener('DOMContentLoaded', updateCartCount);