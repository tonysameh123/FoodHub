const categoriesList = ['Pizza', 'Burgers', 'Sandwiches', 'Salads', 'Pasta', 'Desserts', 'Sides'];

// Render categories
const catContainer = document.getElementById('categories');
categoriesList.forEach(cat => {
  catContainer.innerHTML += `
    <a href="products.html?category=${cat}" class="category-card">
      <h3>${cat}</h3>
    </a>`;
});

// Fetch and render featured products from API
async function loadFeatured() {
  const products = await fetchProducts();
  const container = document.getElementById('featured-products');
  
  if (products.length === 0) {
    container.innerHTML = '<p>No products found</p>';
    return;
  }

  container.innerHTML = products.slice(0, 4).map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="price">${p.price} EGP</p>
        <p>⭐ ${p.rating}</p>
        <div class="card-actions">
          <a href="product-details.html?id=${p._id}" class="btn-secondary">Details</a>
          <button onclick='addToCart(${JSON.stringify(p)})' class="btn-primary">Add</button>
        </div>
      </div>
    </div>
  `).join('');
}

loadFeatured();