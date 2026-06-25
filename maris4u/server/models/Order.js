const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, qty: Number, price: Number }],
  total: Number,
  status: { type: String, enum: ['pending','shipped','delivered','cancelled'], default: 'pending' },
  address: Object
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
