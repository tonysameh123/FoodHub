let currentProduct = null;

async function loadDetails() {
  const id = new URLSearchParams(window.location.search).get('id');
  const container = document.getElementById('details-container');

  const product = await fetchProductById(id);
  
  if (!product || product.message) {
    container.innerHTML = '<h2>Product not found ❌</h2><a href="products.html">Back to Menu</a>';
    return;
  }

  currentProduct = product;

  container.innerHTML = `
    <div class="details-wrapper">
      <img src="${product.image}" alt="${product.name}">
      <div class="details-info">
        <span class="tag">${product.category}</span>
        <h1>${product.name}</h1>
        <p class="rating">⭐ ${product.rating} / 5</p>
        <p class="description">${product.description}</p>
        <p class="price-large">${product.price} EGP</p>
        
        <div class="qty-control">
          <button onclick="changeQty(-1)">-</button>
          <span id="qty">1</span>
          <button onclick="changeQty(1)">+</button>
        </div>
        
        <button class="btn-primary big" onclick="addProductToCart()">
          🛒 Add to Cart
        </button>
        <a href="products.html" class="back-link">← Back to Menu</a>
      </div>
    </div>
  `;
}

function changeQty(delta) {
  const qtyEl = document.getElementById('qty');
  const newQty = parseInt(qtyEl.textContent) + delta;
  if (newQty >= 1) qtyEl.textContent = newQty;
}

function addProductToCart() {
  const qty = parseInt(document.getElementById('qty').textContent);
  addToCart(currentProduct, qty);
}

loadDetails();