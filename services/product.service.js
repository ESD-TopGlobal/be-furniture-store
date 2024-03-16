const { Product } = require('../models')
const AppResponse = require('../helpers/response')
const { Op } = require('sequelize')

const { imageValidation } = require('../validations/image.validation')
const { saveImage } = require('../helpers/image')

const response = new AppResponse();

exports.getAllProducts = async (req, res) => {

    const data = await Product.findAll();

    return response.success('Success get all products', data).send(res)
}

exports.getDetailProduct = async (req, res) => {
    const { id } = req.params;

    const data = await Product.findOne({
        where: {
            id: id
        }
    });

    if (!data) {
        return response.error('Product not found', null, 404).send(res)
    }

    return response.success('Success get detail product', data).send(res)
}

exports.searchProduct = async (req, res) => {
    const { name } = req.query;

    const data = await Product.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        }
    });

    return response.success('Success search product', data).send(res)
}

exports.createProduct = async (req, res) => {
    const imageRes = imageValidation(req)
    if (!imageRes.isSuccess) {
        return imageRes
    }

    saveImage(imageRes.data.file, imageRes.data.filename)

    req.body.image = `/images/${imageRes.data.filename}`
    const data = await Product.create(req.body)

    return response.success('Success create product', data, 201).send(res)
}

exports.updateProduct = async (req, res) => {
    // const imageRes = imageValidation(req)
    // if (!imageRes.isSuccess) {
    //     return imageRes
    // }

    const { id } = req.params

    const data = await Product.update(req.body, {
        where: {
            id: id
        }
    })

    if (data[0] === 0) {
        return response.error('Product not found', null, 404).send(res)
    }

    return response.success('Success update product').send(res)
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params

    const data = await Product.destroy({
        where: {
            id: id
        }
    })

    if (data === 0) {
        return response.error('Product not found', null, 404).send(res)
    }

    return response.success('Success delete product').send(res)
}