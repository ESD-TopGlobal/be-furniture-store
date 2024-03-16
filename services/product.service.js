const { Product } = require('../models')
const AppResponse = require('../helpers/response')
const { Op } = require('sequelize')
const { validateAddProduct, validateEditProduct, validateIdProduct } = require('../validations/product.validation')
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
    const { error, value } = validateAddProduct(req.body)

    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    const image = imageValidation(req)
    if (!image.success) {
        return response.error(imageName.message, null).send(res)
    }

    saveImage(image.file, image.filename)

    value.image = `/images/${image.filename}`
    const data = await Product.create(value)

    return response.success('Success create product', data, 201).send(res)
}

exports.updateProduct = async (req, res) => {
    const { id } = req.params
    const { errorId } = validateIdProduct({ id })
    if (errorId) {
        return response.error(error.details[0].message, null).send(res)
    }

    const { error } = validateEditProduct(req.body)
    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    // const image = imageValidation(req)
    // if (!image.success) {
    //     return response.error(imageName.message, null).send(res)
    // }

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
    const { error } = validateIdProduct({ id })
    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

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