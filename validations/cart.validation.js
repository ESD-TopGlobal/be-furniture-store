const joi = require('joi')

function validateAddCart(data) {
    const schema = joi.object({
        productId: joi.number().required(),
        quantity: joi.number().required(),
        notes: joi.string()
    })

    return schema.validate(data)
}

function validateEditCart(data) {
    const schema = joi.object({
        quantity: joi.number(),
        notes: joi.string()
    })

    return schema.validate(data)
}

function validateIdCart(data) {
    const schema = joi.object({
        id: joi.number().required()
    })

    return schema.validate(data)
}

module.exports = { validateAddCart, validateEditCart, validateIdCart }