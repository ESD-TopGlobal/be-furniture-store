const { Product } = require('../models')
const AppResponse = require('../helpers/response')


exports.getAllProducts = async (req, res) => {

    const data = await Product.findAll();

    return new AppResponse().success('Success get all products', data).send(res)
}

exports.getDetailProduct = async (req, res) => {
    const { id } = req.params;

    const data = await Product.findOne({
        where: {
            id: id
        }
    });

    if (!data) {
        return new AppResponse().error('Product not found', null, 404).send(res)
    }

    return new AppResponse().success('Success get detail product', data).send(res)
}

exports.searchProduct = async (req, res) => {
    const { name } = req.query;

    const data = await Product.findAll({
        where: {
            name: name
        }
    });

    return new AppResponse().success('Success search product', data).send(res)
}

exports.createProduct = async (req, res) => {

}