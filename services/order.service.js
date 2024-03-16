const AppResponse = require('../helpers/response')
const { User, Order, OrderProduct } = require('../models')

const response = new AppResponse()

exports.getDetailOrder = async (req, res) => { }

exports.createOrder = async (req, res) => {
    try {
        const { userId, status, notes, products } = req.body

        // find user by id
        const userData = await User.findByPk(userId)
        if (!userData) {
            return response.error('User not found', null, 404).send(res)
        }

        // create order
        const orderData = await Order.create({
            userId,
            status,
            notes,
            createdAt: new Date(),
        })

        // add products to table relation
        const productData = products.map(() => {
            return {
                orderId: orderData.id,
                productId: products.productId,
                quantity: products.quantity,
                totalPrice: products.quantity * products.price,
                createdAt: new Date(),
            }
        })

        await OrderProduct.bulkCreate(productData)

        return response.success('Order created', orderData).send(res)

    } catch (error) {
        return response.error(error.message, null, 400).send(res)
    }
}

exports.updateOrder = async (req, res) => { }

exports.deleteOrder = async (req, res) => { }