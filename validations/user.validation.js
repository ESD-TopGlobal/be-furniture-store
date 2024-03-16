const joi = require('joi')

exports.validateAddUser = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    return schema.validate(data)
}

exports.validateEditUser = (data) => {
    const schema = joi.object({
        name: joi.string(),
        email: joi.string().email()
    })

    return schema.validate(data)
}