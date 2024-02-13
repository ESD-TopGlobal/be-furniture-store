const fs = require('fs')
const path = require('path')

function readData(filepath) {
    if (fs.existsSync(filepath)) {
        const data = fs.readFileSync(filepath, 'utf-8')
        return data ? JSON.parse(data) : []
    } else {
        return []
    }
}

function writeData(filepath, data) {
    if (!fs.existsSync(path.dirname(filepath))) {
        fs.mkdirSync(path.dirname(filepath), { recursive: true })
    }
    fs.writeFileSync(filepath, JSON.stringify(data, null, 4))
}

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

function getLastId(data) {
    return data.length === 0 ? 0 : data[data.length - 1].id
}

function removeSpace(str) {
    return str.replace(/\s/g, '-')
}

module.exports = { readData, writeData, saveImage, deleteImage, getLastId, removeSpace }