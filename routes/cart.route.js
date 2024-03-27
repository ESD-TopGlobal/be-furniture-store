const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cart.controller')

router.get('/list', cartController.getAllCarts)
router.get('/detail/:id', cartController.getDetailCart)
router.post('/create', cartController.createCart)
router.put('/update/:id', cartController.updateCart)
router.delete('/delete/:id', cartController.deleteCart)

module.exports = router