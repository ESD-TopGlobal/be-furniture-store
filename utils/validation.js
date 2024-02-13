const joi = require('joi')

function validateProduct(method, data) {
    let schema = null

    if (method === 'POST') {
        schema = joi.object({
            name: joi.string().required(),
            desc: joi.string().required(),
            category: joi.string().required(),
            price: joi.number().required(),
            stock: joi.number().required()
        })
    } else if (method === 'PUT') {
        schema = joi.object({
            name: joi.string(),
            desc: joi.string(),
            category: joi.string(),
            price: joi.number(),
            stock: joi.number()
        })
    }

    return schema.validate(data)
}

function validateCart(data) {
    const schema = joi.object({
        productId: joi.string().required(),
        quantity: joi.number().required()
    })

    return schema.validate(data)
}

module.exports = { validateProduct, validateCart }