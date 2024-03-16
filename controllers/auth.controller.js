const authService = require('../services/auth.service')
const { validateLogin } = require('../validations/auth.validation')
const AppResponse = require('../helpers/response')
const { validateAddUser } = require('../validations/user.validation')

const response = new AppResponse()

exports.authLogin = async (req, res, next) => {
    const { error } = validateLogin(req.body)

    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    const result = await authService.authLogin(req, res)
    return result
}

exports.authRegister = async (req, res) => {
    const {error} = validateAddUser(req.body)
    if (error) {
        return response.error(error.details[0].message, null).send(res)
    }

    const result = await authService.authRegister(req, res)
    return result
}