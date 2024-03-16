const express = require('express')
const router = express.Router()

const authRoute = require('./auth.route')
const cartRoute = require('./cart.route')
const productRoute = require('./product.route')
const orderRoute = require('./order.route')
const { authMiddleware } = require('../middleware/auth.middleware')

router.get('/', (req, res) => {
    res.send('Welcome to Furniture Store API!')
})

router.use('/auth', authRoute)
router.use('/carts', authMiddleware, cartRoute)
router.use('/products', authMiddleware, productRoute)
router.use('/orders', authMiddleware, orderRoute)

module.exports = router