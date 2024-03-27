const express = require('express')
const router = express.Router()

const authRoute = require('./auth.route')
const cartRoute = require('./cart.route')
const productRoute = require('./product.route')
const orderRoute = require('./order.route')
const userRoute = require('./user.route')
const { authMiddleware } = require('../middleware/auth.middleware')

router.get('/', (req, res) => {
    res.send('Welcome to Furniture Store API!')
})

router.use('/auth', authRoute)
router.use('/carts', authMiddleware, cartRoute)
router.use('/products', productRoute)
router.use('/orders', authMiddleware, orderRoute)
router.use('/user', authMiddleware, userRoute)

module.exports = router