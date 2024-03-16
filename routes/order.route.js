const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')

router.get('/:id', orderController.getDetailOrder)
router.post('/', orderController.createOrder)

module.exports = router