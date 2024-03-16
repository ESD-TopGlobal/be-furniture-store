const joi = require('joi')

function validateAddProduct(data) {
    schema = joi.object({
        name: joi.string().required(),
        desc: joi.string().required(),
        category: joi.string().required(),
        price: joi.number().required(),
        stock: joi.number().required()
    })

    return schema.validate(data)
}

function validateEditProduct(data) {
    schema = joi.object({
        name: joi.string(),
        desc: joi.string(),
        category: joi.string(),
        price: joi.number(),
        stock: joi.number()
    })

    return schema.validate(data)
}

function validateIdProduct(data) {
    schema = joi.object({
        id: joi.number().required()
    })

    return schema.validate(data)
}

module.exports = { validateAddProduct, validateEditProduct, validateIdProduct }