const User = require('../models/User');
const Product = require('../models/Product');

exports.listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.listProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
