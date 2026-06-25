const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  animeStyle: String,
  images: [String],
  description: String
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
