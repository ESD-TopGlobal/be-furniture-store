const productService = require('../services/product.service');
const { validateAddProduct } = require('../validations/product.validation')
const AppResponse = require('../helpers/response')

exports.getAllProducts = async (req, res) => {

    const result = await productService.getAllProducts();

    return res.status(result.status).json(result);
}

exports.getProductById = async (req, res) => {
}

exports.createProduct = async (req, res) => {
    const { error } = validateAddProduct(req.body);

    if (error) {
        return new AppResponse().error(error.details[0].message, null).send(res)
    }
}