const AppResponse = require('../helpers/response')
const { User, Order } = require('../models')

const response = new AppResponse()

exports.getDetailOrder = async (req, res) => { }

exports.createOrder = async (req, res) => {
    try {
        const { userId, status, notes } = req.body

        // find user by id
        const userData = await User.findByPk(userId)
        if (!userData) {
            return response.error('User not found', null, 404).send(res)
        }

        // create order
        const order = await Order.create({
            userId,
            status,
            notes,
            createdAt: new Date(),
        })

        return response.success('Order created', order).send(res)

    } catch (error) {
        return response.error(error.message, null, 400).send(res)
    }
}

exports.updateOrder = async (req, res) => { }

exports.deleteOrder = async (req, res) => { }