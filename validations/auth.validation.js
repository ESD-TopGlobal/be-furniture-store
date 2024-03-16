const joi = require('joi')

exports.validateLogin = (data) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    return schema.validate(data)
}