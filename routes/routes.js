const express = require('express')
const router = express.Router()

const authRoute = require('./auth.route')
const cartRoute = require('./cart.route')
const productRoute = require('./product.route')

router.use('/auth', authRoute)
router.use('/carts', cartRoute)
router.use('/products', productRoute)

module.exports = router