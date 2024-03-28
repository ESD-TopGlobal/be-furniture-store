const joi = require('joi')

const validateAddOrder = (data) => {
    const schema = joi.object({
        bankPayment: joi.object({
            id: joi.number().required(),
            bankName: joi.string().required(),
        }),
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

const validateUpdateOrder = (data) => {
    const schema = joi.object({
        notes: joi.string(),
        status: joi.string()
    })

    return schema.validate(data)
}

const validateIdOrder = (data) => {
    const schema = joi.object({
        id: joi.number().required()
    })

    return schema.validate(data)
}

module.exports = { validateAddOrder, validateUpdateOrder, validateIdOrder }