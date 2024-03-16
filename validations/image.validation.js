const path = require('path')
const { removeSpace } = require('../helpers/global')

const AppResponse = require('../helpers/response')
const response = new AppResponse();

const imageValidation = (req) => {
    if (!req.files) {
        return response.error('Image is required', null).send(res)
    }

    const file = req.files.image
    const extension = path.extname(file.name)

    if (extension !== '.jpg' && extension !== '.png') {
        return response.error('Image must be jpg or png', null).send(res)
    }

    const productName = removeSpace(req.body.name)
    const filename = `${productName}-${Date.now()}${extension}`

    return { filename, file }
}

module.exports = { imageValidation }