const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const order = await Order.create({ user: req.user._id, items, total });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
