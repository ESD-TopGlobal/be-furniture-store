const AppResponse = require('../helpers/response')
const response = new AppResponse()

const orderService = require('../services/order.service')
const { validateAddOrder } = require('../validations/order.validation')

exports.createOrder = async (req, res) => {
    const { error } = validateAddOrder(req.body)
    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    const result = await orderService.createOrder(req, res)

    return result
}