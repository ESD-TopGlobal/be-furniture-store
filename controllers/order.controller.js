const AppResponse = require('../helpers/response')
const response = new AppResponse()

const orderService = require('../services/order.service')
const { validateAddOrder, validateIdOrder } = require('../validations/order.validation')

exports.getDetailOrder = async (req, res) => {
    const { error } = validateIdOrder({ id: req.params.id })
    if (error) {
        return response.error(error.details[0].message).send(res)
    }

    const result = await orderService.getDetailOrder(req, res)
    return result
}

exports.createOrder = async (req, res) => {
    const { error } = validateAddOrder(req.body)
    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    const result = await orderService.createOrder(req, res)
    return result
}