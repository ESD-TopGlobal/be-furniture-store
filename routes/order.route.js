const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')

router.get('/detail/:id', orderController.getDetailOrder)
router.get('/payment-type', orderController.getPaymentType)
router.post('/create', orderController.createOrder)

module.exports = router