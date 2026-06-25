const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

function loadProducts() {
  const p = path.join(__dirname, '..', 'data', 'products.json');
  try { return JSON.parse(fs.readFileSync(p, 'utf8') || '[]'); } catch(e){return []}
}

router.get('/', (req, res) => {
  const products = loadProducts();
  res.json(products);
});

router.get('/:id', (req, res) => {
  const products = loadProducts();
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

module.exports = router;
