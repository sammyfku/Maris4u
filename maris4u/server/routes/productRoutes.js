const express = require('express')
const router = express.Router()
const { getAll, getOne, create, update, delete: _delete } = require('../controllers/productController')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', _delete)

module.exports = router
