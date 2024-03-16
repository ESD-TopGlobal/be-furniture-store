const AppResponse = require('../helpers/response')

const response = new AppResponse()

exports.getDetailOrder = async (req, res) => { }

exports.createOrder = async (req, res) => {
    try {
        const {  } = req.body
        
    } catch (error) {
        return response.error(error.message, null, 400).send(res)
    }
}

exports.updateOrder = async (req, res) => { }

exports.deleteOrder = async (req, res) => { }