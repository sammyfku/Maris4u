const express = require('express')
const router = express.Router()
const admin = require('../middleware/adminMiddleware')
const { getDashboardStats, getAllUsers } = require('../controllers/adminController')

router.get('/stats', admin, getDashboardStats)
router.get('/users', admin, getAllUsers)

module.exports = router
