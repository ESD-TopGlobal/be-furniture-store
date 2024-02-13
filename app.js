const express = require('express')
const joi = require('joi')
const fs = require('fs')
const cors = require('cors')
const path = require('path')

const PORT = 3000

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const productDataPath = './data/products.json'
const orderDataPath = './data/orders.json'

const productSchema = joi.object({
    name: joi.string().required(),
    desc: joi.string().required(),
    category: joi.string().required(),
    price: joi.number().required(),
    stock: joi.number().required(),
    image: joi.string().required()
})

function readData(filepath) {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'))
}

function writeData(filepath, data) {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 4))
}

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
    const results = products.filter(product => product.name.includes(name))
    res.status(200).json(new Response(true, `Search product by name ${name}`, results))
})

// POST /products: Menambahkan produk baru
app.post('/products', (req, res) => {
    const { error, value } = productSchema.validate(req.body)
    if (error) {
        res.status(400).json(new Response(false, error.details[0].message, null))
    } else {
        const products = readData(productDataPath)
        const newProduct = { id: products.length + 1, ...value }
        products.push(newProduct)
        writeData(productDataPath, products)
        res.status(201).json(new Response(true, 'Add new product', newProduct))
    }
})

// Admin role only

// PUT /products/{id}: Memperbarui produk berdasarkan ID
app.put('/products/:id', (req, res) => {
    const productId = req.params.id

    const products = readData(productDataPath)
    const index = products.findIndex(product => product.id === productId)
    if (index !== -1) {
        products[index] = { id: productId, ...value }
        writeData(productDataPath, products)
        res.status(200).json(new Response(true, 'Update product by id', products[index]))
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
        res.status(200).json(new Response(true, `Delete product by id ${productId}`, null))
    } else {
        res.status(404).json(new Response(false, `Product with id ${productId} not found`, null))
    }
})


// TODO: API for order management
// User role
// POST /checkout: Membuat pesanan baru.
// GET /orders: Mendapatkan daftar semua pesanan.
// GET /orders/{id}: Mendapatkan detail pesanan berdasarkan ID.
// PUT /orders/{id}: Memperbarui status pesanan (misalnya: diproses, dikirim, selesai).
// DELETE /orders/{id}: Membatalkan pesanan berdasarkan ID.

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

