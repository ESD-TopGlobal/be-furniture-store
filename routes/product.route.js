const express = require('express')
const router = express.Router()

const productController = require('../controllers/product.controller')

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getDetailProduct)
router.get('/search', productController.searchProduct)
router.post('/', productController.createProduct)

module.exports = router