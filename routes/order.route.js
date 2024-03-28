const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')

router.get('/detail/:id', orderController.getDetailOrder)
router.get('/bank-payment', orderController.getBankPaymentName)
router.post('/create', orderController.createOrder)
router.put('/update/:id', orderController.updateOrder)
router.delete('/delete/:id', orderController.deleteOrder)

module.exports = router