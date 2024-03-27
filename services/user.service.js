const { User } = require('../models')
const bcrypt = require('bcrypt')
const AppResponse = require('../helpers/response')

const response = new AppResponse()

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, password } = req.body

        const userData = await User.findByPk(id)
        if (!userData) {
            return response.error('User not found', null, 404).send(res)
        }

        let newUserData = {}
        if (name) {
            newUserData.name = name
        }
        if (email) {
            const isEmailExist = await User.findOne({
                where: {
                    email: email
                }
            })
            if (isEmailExist) {
                return response.error('Email already exists', null, 400).send(res)
            }

            newUserData.email = email
        }
        if (password) {
            const hashPassword = await bcrypt.hash(password, 10)
            if (!hashPassword) {
                return response.error('Failed to hash password', null, 500).send(res)
            }

            newUserData.password = hashPassword
        }

        const updatedUserData = await User.update(newUserData, {
            where: {
                id: id
            }
        })

        return response.success('Success update user', updatedUserData).send(res)

    } catch (error) {
        return response.error("Error updating user", null, 500).res(send)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const userData = await User.findByPk(id)
        if (!userData) {
            return response.error('User not found', null, 404).send(res)
        }

        const deletedUserData = await User.destroy({
            where: {
                id: id
            }
        })

        return response.success('Success delete user', deletedUserData).send(res)

    } catch (error) {
        return response.error("Error deleting user", null, 500).res(send)
    }
}