document.addEventListener('DOMContentLoaded', async () => {
  const productsEl = document.getElementById('products');
  const productsList = document.getElementById('products-list');
  if (productsEl || productsList) {
    const products = await apiGet('/products');
    const el = productsEl || productsList;
    el.innerHTML = products.map(p => `<article><h3>${p.name}</h3><p>$${p.price}</p><a href="/product.html?id=${p.id}">View</a></article>`).join('\n');
  }

  // Load product details if on product page
  if (document.getElementById('product-details')) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      const p = await apiGet('/products/' + id);
      document.getElementById('product-name').textContent = p.name || 'Product';
      document.getElementById('product-details').innerHTML = `<p>${p.description||''}</p><p>$${p.price}</p>`;
    }
  }
});
