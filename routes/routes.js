const express = require('express')
const router = express.Router()

const productRoute = require('./product.route')
const cartRoute = require('./cart.route')

router.use('/products', productRoute)
router.use('/carts', cartRoute)

module.exports = router