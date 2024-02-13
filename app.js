const express = require('express')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')

const { readData, writeData, saveImage, getLastId } = require('./utils/accessData')
const { validateProduct } = require('./utils/validation')

const PORT = 3000

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())

const productDataPath = './data/products.json'
const orderDataPath = './data/orders.json'

class Response {
    constructor(success, message, data) {
        this.success = success
        this.message = message
        this.data = data
    }
}

app.get('/', (req, res) => {
    res.status(200).json(new Response(true, 'Welcome to the Furniture Store API', null))
})

// API for product management

// User and admin role

// GET /products: Mendapatkan daftar semua produk
app.get('/products', (req, res) => {
    const result = readData(productDataPath)
    res.status(200).json(new Response(true, 'Get all products', result))
})

// GET /products/{id}: Mendapatkan detail produk berdasarkan ID
app.get('/products/:id', (req, res) => {
    const productId = req.params.id
    const products = readData(productDataPath)
    const product = products.find(product => product.id === productId)
    if (product) {
        res.status(200).json(new Response(true, 'Get product by id', product))
    } else {
        res.status(404).json(new Response(false, `Product with id ${productId} not found`, null))
    }
})

// GET /search/products?name={name}: Mencari produk berdasarkan nama
app.get('/search/products', (req, res) => {
    const name = req.query.name
    const products = readData(productDataPath)
    const results = products.filter(product => {
        return product.name.toLowerCase().includes(name.toLowerCase())
    })
    res.status(200).json(new Response(true, `Search product by name ${name}`, results))
})

// POST /products: Menambahkan produk baru
app.post('/products', (req, res) => {
    const { error, value } = validateProduct('POST', req.body)

    if (error) {
        res.status(400).json(new Response(false, error.details[0].message, null))
    } else {
        const image = req.files.image
        const extension = path.extname(image.name)
        if (extension !== '.jpg' && extension !== '.png') {
            res.status(400).json(new Response(false, 'Image must be jpg or png', null))
            return
        }
        const imageName = `${Date.now()}-${value.name}${extension}`
        value.image = `/images/${imageName}`

        const products = readData(productDataPath)
        const lastId = getLastId(products)
        const newProduct = { id: lastId + 1, ...value }
        products.push(newProduct)

        saveImage(image, imageName)
        writeData(productDataPath, products)

        res.status(201).json(new Response(true, 'Add new product success', null))
    }
})

// Admin role only

// PUT /products/{id}: Memperbarui produk berdasarkan ID
app.put('/products/:id', (req, res) => {
    const productId = req.params.id
    
    const products = readData(productDataPath)
    const index = products.findIndex(product => product.id === parseInt(productId))
    
    if (index !== -1) {
        const { error, value } = validateProduct('PUT', req.body)

        if (error) {
            return res.status(400).json(new Response(false, error.details[0].message, null))
        }

        const oldProduct = products[index]
        const newProduct = { ...oldProduct, ...value }

        products[index] = newProduct

        if (req.files && req.files.image) {
            const image = req.files.image
            const extension = path.extname(image.name)
            if (extension !== '.jpg' && extension !== '.png') {
                res.status(400).json(new Response(false, 'Image must be jpg or png', null))
                return
            }
            const imageName = `${Date.now()}-${value.name}${extension}`

            saveImage(image, imageName)

            value.image = `/images/${imageName}`
        }

        writeData(productDataPath, products)

        res.status(200).json(new Response(true, 'Update product success', null))
    } else {
        res.status(404).json(new Response(false, `Product with id ${productId} not found`, null))
    }
})

// DELETE /products/{id}: Menghapus produk berdasarkan ID
app.delete('/products/:id', (req, res) => {
    const productId = req.params.id
    const products = readData(productDataPath)
    const index = products.findIndex(product => product.id === productId)
    if (index !== -1) {
        products.splice(index, 1)
        writeData(productDataPath, products)
        res.status(200).json(new Response(true, `Product with id ${productId} deleted`, null))
    } else {
        res.status(404).json(new Response(false, `Product with id ${productId} not found`, null))
    }
})


// TODO: API for order management
// User role
// POST /checkout: Membuat pesanan baru
// GET /orders: Mendapatkan daftar semua pesanan
// GET /orders/{id}: Mendapatkan detail pesanan berdasarkan ID
// PUT /orders/{id}: Memperbarui status pesanan (misalnya: diproses, dikirim, selesai)
// DELETE /orders/{id}: Membatalkan pesanan berdasarkan ID

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})