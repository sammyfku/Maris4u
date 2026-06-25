const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const requireAuth = require('../middleware/auth');

function ordersPath() { return path.join(__dirname, '..', 'data', 'orders.json'); }
function loadOrders() { try { return JSON.parse(fs.readFileSync(ordersPath(), 'utf8') || '[]'); } catch(e){return []} }
function saveOrders(orders) { fs.writeFileSync(ordersPath(), JSON.stringify(orders, null, 2)); }

// Create an order (requires auth)
router.post('/', requireAuth, (req, res) => {
  const { items, total } = req.body;
  if (!Array.isArray(items) || typeof total !== 'number') return res.status(400).json({ error: 'Invalid payload' });
  const orders = loadOrders();
  const order = { id: `order-${Date.now()}`, userId: req.user.id, items, total, createdAt: new Date().toISOString() };
  orders.push(order);
  saveOrders(orders);
  res.json(order);
});

// Get orders for current user
router.get('/', requireAuth, (req, res) => {
  const orders = loadOrders();
  const mine = orders.filter(o => o.userId === req.user.id);
  res.json(mine);
});

module.exports = router;
