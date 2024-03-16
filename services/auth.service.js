const bcrypt = require('bcrypt')
const { User } = require('../models')
const jsonwebtoken = require('jsonwebtoken')
const AppResponse = require('../helpers/response')

const response = new AppResponse()

const dotenv = require('dotenv')

dotenv.config()

exports.authLogin = async (req, res) => {
    const { email, password } = req.body

    const userData = await User.findOne({
        where: {
            email: email
        }
    })

    if (!userData) {
        return response.error('Wrong email or password', null, 401).send(res)
    }

    const isValidPassword = await bcrypt.compare(password, userData.password)
    if (!isValidPassword) {
        return response.error('Wrong email or password', null, 401).send(res)
    }

    const token = jsonwebtoken.sign({
        id: userData.id,
        email: userData.email,
        name: userData.name,
    }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })

    res.cookie('auth', token, { maxAge: 24 * 3600 * 1000 })

    return response.success('Login success', { token }, 201).send(res)
}

exports.authRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const hashPassword = await bcrypt.hash(password, 10)
        if (!hashPassword) {
            return response.error('Failed to hash password', null, 500).send(res)
        }

        // check if user exists
        const isUserExists = await User.findOne({
            where: {
                email: email
            }
        })
        if (isUserExists) {
            return response.error('Email already exists', null, 400).send(res)
        }

        const data = await User.create({ name, email, password: hashPassword })
        if (!data) {
            return response.error('Failed register', null, 500).send(res)
        }

        return response.success('Success register', data.name, 201).send(res)
    } catch (error) {
        return response.error(error.message, null, 500).send(res)
    }
}

exports.authRefreshToken = (res, user, token) => {
    try {
        const expireTime = jsonwebtoken.decode(token).exp
        const remainingTime = expireTime - Date.now()

        // if expire time less than 1 hour, create new token
        let newToken = ""
        if (remainingTime < 3600) {
            newToken = jsonwebtoken.sign({
                id: user.id,
                email: user.email,
                name: user.name,
            }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            })

            res.cookie('auth', newToken, { maxAge: 24 * 3600 * 1000 })
        }

        return response.success("Success creating refresh token")
    } catch (error) {
        return response.error(error.message)
    }
}