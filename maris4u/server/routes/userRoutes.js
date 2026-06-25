const express = require('express')
const router = express.Router()
const { updateProfile, getMyOrders } = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')

router.put('/', auth, updateProfile)
router.get('/orders', auth, getMyOrders)

module.exports = router
