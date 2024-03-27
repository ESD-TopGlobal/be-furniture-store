const userService = require('../services/user.service')
const { validateEditUser, validateIdUser } = require('../validations/user.validation')

const AppResponse = require('../helpers/response')
const response = new AppResponse()

exports.updateUser = async (req, res) => {
    const { errorId } = validateIdUser({ id: req.params.id })
    if (errorId) {
        return response.error(errorId.details[0].message).send(res)
    }

    const { error } = validateEditUser(req.body)
    if (error) {
        return response.error(error.details[0].message).send(res)
    }

    const result = await userService.updateUser(req, res)
    return result
}

exports.deleteUser = async (req, res) => {
    const { error } = validateIdUser({ id: req.params.id })
    if (error) {
        return response.error(error.details[0].message).send(res)
    }

    const result = await userService.deleteUser(req, res)
    return result
}