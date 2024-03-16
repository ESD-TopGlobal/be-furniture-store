const fs = require('fs')
const path = require('path')

function saveImage(image, filename) {
    // initialize directory if not exist
    if (!fs.existsSync(path.join(__dirname, '../public/images'))) {
        fs.mkdirSync(path.join(__dirname, 'public/images'))
    }
    image.mv(path.join(__dirname, '../public/images', filename))
}

function deleteImage(filename) {
    const filepath = path.join(__dirname, '../public/images', filename)
    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath)
    }
}

module.exports = { saveImage, deleteImage }