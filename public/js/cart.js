// Very small cart helper using localStorage
function getCart() {
  try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch(e){return []}
}
function saveCart(items) { localStorage.setItem('cart', JSON.stringify(items)); }

function addToCart(item) {
  const items = getCart();
  items.push(item);
  saveCart(items);
}

async function checkout() {
  const token = localStorage.getItem('token');
  const items = getCart();
  const total = items.reduce((s,i)=>s+(i.price||0),0);
  const r = await apiPost('/orders', { items, total }, token);
  if (r.id) { saveCart([]); alert('Order placed'); window.location='/orders.html'; }
  else alert(r.error || 'Checkout error');
}
