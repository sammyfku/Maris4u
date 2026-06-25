const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const requireAuth = require('../middleware/auth');

function productsPath() { return path.join(__dirname, '..', 'data', 'products.json'); }
function loadProducts() { try { return JSON.parse(fs.readFileSync(productsPath(), 'utf8') || '[]'); } catch(e){return []} }
function saveProducts(products) { fs.writeFileSync(productsPath(), JSON.stringify(products, null, 2)); }

// Admin: list all products
router.get('/products', requireAuth, (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Forbidden' });
  res.json(loadProducts());
});

// Admin: add product
router.post('/products', requireAuth, (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Forbidden' });
  const { id, name, price, description, image, stock } = req.body;
  if (!id || !name) return res.status(400).json({ error: 'Missing fields' });
  const products = loadProducts();
  products.push({ id, name, price: Number(price)||0, description, image, stock: Number(stock)||0 });
  saveProducts(products);
  res.json({ success: true });
});

// Admin: delete product
router.delete('/products/:id', requireAuth, (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Forbidden' });
  let products = loadProducts();
  const before = products.length;
  products = products.filter(p => p.id !== req.params.id);
  saveProducts(products);
  res.json({ deleted: before - products.length });
});

module.exports = router;
