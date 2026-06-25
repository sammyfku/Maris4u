const express = require('express')
const router = express.Router()
const { createOrder, updateOrderStatus } = require('../controllers/orderController')
const auth = require('../middleware/authMiddleware')

router.post('/', auth, createOrder)
router.put('/:id/status', auth, updateOrderStatus)

module.exports = router
