const productService = require('../services/product.service');
const { validateAddProduct } = require('../validations/product.validation')
const AppResponse = require('../helpers/response')

exports.getAllProducts = async (req, res) => {

    const result = await productService.getAllProducts(req, res);

    return new AppResponse().success('Success get all products', result).send(res);
}

exports.getDetailProduct = async (req, res) => {
    const result = await productService.getDetailProduct(req, res);

    return new AppResponse().success('Success get detail product', result).send(res);
}

exports.searchProduct = async (req, res) => {
    const result = await productService.searchProduct(req, res);

    return new AppResponse().success('Success search product', result).send(res);
}

exports.createProduct = async (req, res) => {
    const { error } = validateAddProduct(req.body);

    if (error) {
        return new AppResponse().error(error.details[0].message, null).send(res)
    }
}