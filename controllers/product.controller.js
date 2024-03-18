const productService = require('../services/product.service');
const { validateAddProduct, validateEditProduct, validateSearchProduct, validateIdProduct } = require('../validations/product.validation')
const AppResponse = require('../helpers/response')

const response = new AppResponse();

exports.getAllProducts = async (req, res) => {

    const result = await productService.getAllProducts(req, res);

    return result;
}

exports.getDetailProduct = async (req, res) => {
    const result = await productService.getDetailProduct(req, res);

    return result;
}

exports.searchProduct = async (req, res) => {
    const { error } = validateSearchProduct(req.query)
    if (error) {
        return response.error(error.details[0].message).send(res)
    }

    const result = await productService.searchProduct(req, res);

    return result;
}

exports.createProduct = async (req, res) => {
    const { error } = validateAddProduct(req.body);

    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    const result = await productService.createProduct(req, res);

    return result
}

exports.updateProduct = async (req, res) => {
    const { errorId } = validateIdProduct({ id: req.params.id })
    if (errorId) {
        return response.error(error.details[0].message, null).send(res)
    }

    const { error } = validateEditProduct(req.body);

    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    const result = await productService.updateProduct(req, res);

    return result;
}

exports.deleteProduct = async (req, res) => {
    const { error } = validateIdProduct({ id: req.params.id })
    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    const result = await productService.deleteProduct(req, res);

    return result;
}