const list = document.getElementById('products-list');
const search = document.getElementById('search');
const filter = document.getElementById('filter-category');

// Read URL param
const urlCat = new URLSearchParams(window.location.search).get('category');
if (urlCat) filter.value = urlCat;

async function render() {
  list.innerHTML = '<p style="text-align:center;">Loading...</p>';
  
  const term = search.value;
  const cat = filter.value;
  const products = await fetchProducts(cat, term);

  if (products.length === 0) {
    list.innerHTML = '<p style="text-align:center;">😢 No meals found.</p>';
    return;
  }

  list.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <div class="product-info">
        <span class="tag">${p.category}</span>
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

let searchTimer;
search.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(render, 300);
});
filter.addEventListener('change', render);

render();