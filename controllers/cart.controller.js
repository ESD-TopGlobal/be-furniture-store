const AppResponse = require('../helpers/response')
const cartService = require('../services/cart.service')
const { validateAddCart, validateIdCart } = require('../validations/cart.validation')

const response = new AppResponse()

exports.getAllCarts = async (req, res) => {

    const result = await cartService.getAllCarts(req, res)

    return result
}

exports.getDetailCart = async (req, res) => {

    const { error } = validateIdCart({ id: req.params.id })

    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    const result = await cartService.getDetailCart(req, res)

    return result
}

exports.createCart = async (req, res) => {

    const { error } = validateAddCart(req.body)

    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    const result = await cartService.createCart(req, res)

    return result
}

exports.updateCart = async (req, res) => {

    const { error } = validateIdCart({ id: req.params.id })

    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    const result = await cartService.updateCart(req, res)

    return result
}

exports.deleteCart = async (req, res) => {

    const { error } = validateIdCart({ id: req.params.id })

    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    const result = await cartService.deleteCart(req, res)

    return result
}