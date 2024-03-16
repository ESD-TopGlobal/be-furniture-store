const joi = require('joi')

function validateAddCart(data) {
    schema = joi.object({
        productId: joi.number().required(),
        quantity: joi.number().required(),
        notes: joi.string()
    })

    return schema.validate(data)
}

function validateEditCart(data) {
    schema = joi.object({
        quantity: joi.number(),
        notes: joi.string()
    })

    return schema.validate(data)
}

function validateIdCart(data) {
    schema = joi.object({
        id: joi.number().required()
    })

    return schema.validate(data)
}

module.exports = { validateAddCart, validateEditCart, validateIdCart }