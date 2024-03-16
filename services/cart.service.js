const { Cart } = require('../models')
const AppResponse = require('../helpers/response')

const response = new AppResponse()

exports.getAllCarts = async (req, res) => {

    const data = await Cart.findAll()

    return response.success('Success get all carts', data).send(res)
}

exports.getDetailCart = async (req, res) => {
    const { id } = req.params;

    const data = await Cart.findOne({
        where: {
            id: id
        }
    });

    if (!data) {
        return response.error('Cart not found', null, 404).send(res)
    }

    return response.success('Success get detail cart', data).send(res)
}

exports.createCart = async (req, res) => {
    const data = await Cart.create(req.body)

    return response.success('Success create cart', data, 201).send(res)
}

exports.updateCart = async (req, res) => {
    const { id } = req.params

    const data = await Cart.update(req.body, {
        where: {
            id: id
        }
    })

    return response.success('Success update cart', data).send(res)
}

exports.deleteCart = async (req, res) => {
    const { id } = req.params

    const data = await Cart.destroy({
        where: {
            id: id
        }
    })

    return response.success('Success delete cart', data).send(res)
}