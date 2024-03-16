const jsonwebtoken = require('jsonwebtoken')
const AppResponse = require('../helpers/response');
const { authRefreshToken } = require('../services/auth.service');

const response = new AppResponse();

exports.authMiddleware = (req, res, next) => {
    try {
        
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]
            const user = jsonwebtoken.verify(token, process.env.JWT_SECRET)

            const refreshToken = authRefreshToken(res, user, token)

            if (!refreshToken.isSuccess) {
                return response.error('Failed creating new token', null, 401).send(res)
            }

            req.user = user
            next()
        } else {
            return response.error('Unauthorized', null, 401).send(res)
        }

    } catch (error) {
        return response.error('Unauthorized', null, 401).send(res)
    }
}