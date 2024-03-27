const joi = require('joi')

const validateAddOrder = (data) => {
    const schema = joi.object({
        paymentType: joi.string().required(),
        notes: joi.string(),
        status: joi.string().required(),
        products: joi.array().items(
            joi.object({
                productId: joi.number().required(),
                quantity: joi.number().required()
            })
        )
    })

    return schema.validate(data)
}

const validateIdOrder = (data) => {
    const schema = joi.object({
        id: joi.number().required()
    })

    return schema.validate(data)
}

module.exports = { validateAddOrder, validateIdOrder }