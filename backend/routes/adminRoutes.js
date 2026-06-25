const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.get('/users', auth, admin, adminController.listUsers);
router.get('/products', auth, admin, adminController.listProducts);

module.exports = router;
