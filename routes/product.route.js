const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/auth.middleware')

const productController = require('../controllers/product.controller')

router.get('/list', productController.getAllProducts)
router.get('/detail/:id', productController.getDetailProduct)
router.get('/search', productController.searchProduct)
router.post('/create', authMiddleware, productController.createProduct)
router.put('/update/:id', authMiddleware, productController.updateProduct)
router.delete('/delete/:id', authMiddleware, productController.deleteProduct)

module.exports = router