const { v4: uuidv4 } = require('uuid');
const midtransCoreApi = require('../helpers/midtrans')
const AppResponse = require('../helpers/response')
const { User, Order, Product, Order_Product, BankPayment } = require('../models')

const response = new AppResponse()

exports.getDetailOrder = async (req, res) => {
    try {
        const { orderId } = req.params

        // check if order id exist
        const orderData = Order.findByPk(orderId)
        if (!orderData) {
            return response.error('Order not found', null, 404).send(res)
        }

        const orderProductData = await OrderProduct.findAll({
            where: {
                orderId: orderId
            }
        })
        if (!orderProductData) {
            return response.error('Ordered products not found', null, 404).send(res)
        }

        const result = orderData
        result.products = orderProductData

        return response.success('Success get detail order', result).send(res)

    } catch (error) {
        return response.error("Error getting order details", null, 500).res(send)
    }
}

exports.createOrder = async (req, res) => {
    try {
        const { status, notes, bankPayment, products } = req.body

        // get user id from token
        const userId = req.user.id
        if (!userId) {
            return response.error('User not found', null, 404).send(res)
        }

        // find user by id
        const userData = await User.findByPk(userId)
        if (!userData) {
            return response.error('User not found', null, 404).send(res)
        }

        // generate uuidv4 for order id
        const orderId = uuidv4()
        let productData = []
        let priceTotal = 0

        // add products to table relation
        const productBulkInsert = await Promise.all(products.map(async (product) => {
            const isProductExist = await Product.findByPk(product.productId)

            if (!isProductExist) {
                throw new Error(`Product with id ${product.productId} not found`)
            }

            const data = isProductExist.dataValues
            productData.push({
                id: data.id,
                price: data.price,
                quantity: product.quantity,
                name: data.name
            })

            priceTotal = priceTotal + (product.quantity * isProductExist.dataValues.price)

            return {
                orderId: orderId,
                productId: product.productId,
                quantity: product.quantity,
                createdAt: new Date(),
            }
        }))

        const dataMidstrans = {
            "payment_type": "bank_transfer",
            "transaction_details": {
                "order_id": orderId,
                "gross_amount": priceTotal
            },
            "item_details": productData,
            "bank_transfer": {
                "bank": `${bankPayment.bankName}`
            },
            "customer_details": {
                "first_name": req.user.name,
                "last_name": req.user.name,
                "email": req.user.email,
            }
        }

        const transactionToken = await midtransCoreApi.charge(dataMidstrans)

        // create order
        const orderData = await Order.create({
            id: orderId,
            userId,
            priceTotal,
            notes,
            bankPaymentId: bankPayment.id,
            vaNumber: transactionToken.va_numbers[0].va_number,
            status: transactionToken.transaction_status,
            createdAt: new Date(),
        })

        await Order_Product.bulkCreate(productBulkInsert)

        return response.success('Order created', orderData).send(res)

    } catch (error) {
        console.error(error)
        return response.error(error.message, null, 400).send(res)
    }
}

exports.getBankPaymentName = async (req, res) => {
    try {
        const data = await BankPayment.findAll({
            attributes: ['id', 'bankName']
        })
        return response.success('Success get payment type', data).send(res)
    } catch (error) {
        return response.error('Error getting payment type', null, 500).send(res)
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status, notes } = req.body

        // check if order id exist
        const orderData = Order.findByPk(orderId)
        if (!orderData) {
            return response.error('Order not found', null, 404).send(res)
        }

        let newOrder = {
            updatedAt: new Date()
        }
        if (status) {
            newOrder.status = status
        }
        if (notes) {
            newOrder.notes = notes
        }

        await Order.update(newOrder, {
            where: {
                id: orderId
            }
        })

        return response.success('Order updated', null).send(res)

    } catch (error) {
        return response.error("Error updating order", null, 500).res(send)
    }
 }

exports.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params

        // check if order id exist
        const orderData = Order.findByPk(orderId)
        if (!orderData) {
            return response.error('Order not found', null, 404).send(res)
        }

        await Order.destroy({
            where: {
                id: orderId
            }
        })

        return response.success('Order deleted', null).send(res)

    } catch (error) {
        return response.error("Error deleting order", null, 500).res(send)
    }
 }