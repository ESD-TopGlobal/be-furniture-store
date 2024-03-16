const { Product } = require('../models')
const AppResponse = require('../helpers/response')
const { Op } = require('sequelize')
const { validateAddProduct } = require('../validations/product.validation')

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
    const { error, value } = validateAddProduct('POST', req.body)

    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    const image = req.files.image
    const extension = path.extname(image.name)
    if (extension !== '.jpg' && extension !== '.png') {
        return res.status(400).json(new Response(false, 'Image must be jpg or png', null))
    }

    const productName = removeSpace(value.name)
    const imageName = `${Date.now()}-${productName}${extension}`
    value.image = `/images/${imageName}`

    console.log(value)

    const data = await Product.create(value)
}