const jsonwebtoken = require('jsonwebtoken')
const AppResponse = require('../helpers/response')

const response = new AppResponse();

exports.auth = (req, res, next) => {
    try {
        
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]
            const user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
            req.user = user
            next()
        } else {
            return response.error('Unauthorized', null, 401).send(res)
        }

    } catch (error) {
        return response.error('Unauthorized', null, 401).send(res)
    }
}