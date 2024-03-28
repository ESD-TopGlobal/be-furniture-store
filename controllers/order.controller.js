const AppResponse = require('../helpers/response')
const response = new AppResponse()

const orderService = require('../services/order.service')
const { validateAddOrder, validateIdOrder, validateUpdateOrder } = require('../validations/order.validation')

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

exports.getBankPaymentName = async (req, res) => {

    const result = await orderService.getBankPaymentName(req, res)
    return result

}

exports.updateOrder = async (req, res) => {
    const { errorId } = validateIdOrder({ id: req.params.id })
    if (errorId) {
        return response.error(errorId.details[0].message).send(res)
    }

    const { errorBody } = validateUpdateOrder(req.body)
    if (errorBody) {
        return response.error(errorBody.details[0].message).send(res)
    }

    const result = await orderService.updateOrder(req, res)
    return result
}

exports.deleteOrder = async (req, res) => {
    const { errorId } = validateIdOrder({ id: req.params.id })
    if (errorId) {
        return response.error(errorId.details[0].message).send(res)
    }

    const result = await orderService.deleteOrder(req, res)
    return result
}