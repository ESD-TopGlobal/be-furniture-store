const express = require('express')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')

const { readData, writeData, saveImage, deleteImage, getLastId, removeSpace } = require('./utils/accessData')
const { validateProduct } = require('./utils/validation')

const PORT = 3010

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())

const PRODUCT_PATH = './data/products.json'
const CART_PATH = './data/carts.json'

class Response {
    constructor(success, message, data) {
        this.success = success
        this.message = message
        this.data = data
    }
}

class Product {
    constructor(id, name, desc, category, price, stock, image) {
        this.id = id
        this.name = name
        this.desc = desc
        this.category = category
        this.price = price
        this.stock = stock
        this.image = image
    }
}

class Cart {
    constructor(id, productId, quantity, totalPrice) {
        this.id = id
        this.productId = productId
        this.quantity = quantity
        this.totalPrice = totalPrice
    }
}

app.get('/', (req, res) => {
    res.status(200).json(new Response(true, 'Welcome to the Furniture Store API', null))
})

// API for product management

// User and admin role

// GET /products: Mendapatkan daftar semua produk
app.get('/products', (req, res) => {
    const product = readData(PRODUCT_PATH)
    if (product.length === 0) {
        res.status(404).json(new Response(false, 'No products found', null))
        return
    }
    res.status(200).json(new Response(true, 'Get all products', product))
})

// GET /products/{id}: Mendapatkan detail produk berdasarkan ID
app.get('/products/:id', (req, res) => {
    const productId = req.params.id
    const products = readData(PRODUCT_PATH)
    const product = products.find(product => product.id === productId)
    if (!product) {
        res.status(404).json(new Response(false, `Product with id ${productId} not found`, null))
        return
    }

    res.status(200).json(new Response(true, 'Get product by id', product))
})

// GET /search/products?name={name}: Mencari produk berdasarkan nama
app.get('/search/products', (req, res) => {
    const name = req.query.name
    const products = readData(PRODUCT_PATH)
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
        return
    }

    const image = req.files.image
    const extension = path.extname(image.name)
    if (extension !== '.jpg' && extension !== '.png') {
        res.status(400).json(new Response(false, 'Image must be jpg or png', null))
        return
    }

    const productName = removeSpace(value.name)
    const imageName = `${Date.now()}-${productName}${extension}`
    value.image = `/images/${imageName}`

    const products = readData(PRODUCT_PATH)
    const lastId = getLastId(products)
    const newProduct = new Product(
        lastId + 1,
        value.name,
        value.desc,
        value.category,
        value.price,
        value.stock,
        value.image
    )
    products.push(newProduct)

    saveImage(image, imageName)
    writeData(PRODUCT_PATH, products)

    res.status(201).json(new Response(true, 'Add new product success', null))
})

// Admin role only

// PUT /products/{id}: Memperbarui produk berdasarkan ID
app.put('/products/:id', (req, res) => {
    const productId = req.params.id

    const products = readData(PRODUCT_PATH)
    const index = products.findIndex(product => product.id === parseInt(productId))

    if (index === -1) {
        res.status(404).json(new Response(false, `Product with id ${productId} not found`, null))
        return
    }

    const { error, value } = validateProduct('PUT', req.body)
    if (error) {
        return res.status(400).json(new Response(false, error.details[0].message, null))
    }

    const oldProduct = products[index]

    if (req.files && req.files.image) {
        const image = req.files.image
        const extension = path.extname(image.name)
        if (extension !== '.jpg' && extension !== '.png') {
            res.status(400).json(new Response(false, 'Image must be jpg or png', null))
            return
        }

        const productName = removeSpace(value.name ? value.name : oldProduct.name)
        const imageName = `${Date.now()}-${productName}${extension}`

        if (oldProduct.image) {
            deleteImage(oldProduct.image.split('/')[2])
        }
        saveImage(image, imageName)

        value.image = `/images/${imageName}`
    }

    const newProduct = new Product(
        oldProduct.id,
        value.name ? value.name : oldProduct.name,
        value.desc ? value.desc : oldProduct.desc,
        value.category ? value.category : oldProduct.category,
        value.price ? value.price : oldProduct.price,
        value.stock ? value.stock : oldProduct.stock,
        value.image ? value.image : oldProduct.image
    )

    products[index] = newProduct

    writeData(PRODUCT_PATH, products)

    res.status(200).json(new Response(true, 'Update product success', null))
})

// DELETE /products/{id}: Menghapus produk berdasarkan ID
app.delete('/products/:id', (req, res) => {
    const productId = req.params.id

    const products = readData(PRODUCT_PATH)

    const index = products.findIndex(product => product.id === productId)

    if (index !== -1) {
        products.splice(index, 1)
        writeData(PRODUCT_PATH, products)
        res.status(200).json(new Response(true, `Product with id ${productId} deleted`, null))
    } else {
        res.status(404).json(new Response(false, `Product with id ${productId} not found`, null))
    }
})


// API for cart and order management

// POST /carts: Menambahkan produk ke keranjang
app.post('/carts', (req, res) => {
    const { productId, quantity } = req.body
    const products = readData(PRODUCT_PATH)

    const product = products.find(product => product.id === parseInt(productId))
    if (!product) {
        res.status(404).json(new Response(false, `Product with id ${productId} not found`, null))
        return
    }

    if (product.stock < quantity) {
        res.status(400).json(new Response(false, 'Stock not enough', null))
        return
    }

    const carts = readData(CART_PATH)
    const lastId = getLastId(carts)

    const totalPrice = product.price * quantity
    const newCart = new Cart(lastId + 1, productId, quantity, totalPrice)
    carts.push(newCart)

    writeData(CART_PATH, carts)

    res.status(201).json(new Response(true, 'Add product to cart success', null))
})

// GET /carts: Mendapatkan daftar produk di keranjang
app.get('/carts', (req, res) => {
    const carts = readData(CART_PATH)
    if (carts.length === 0) { 
        res.status(404).json(new Response(false, 'No products in cart', null))
        return
    }

    const products = readData(PRODUCT_PATH)
    carts.forEach(cart => {
        const product = products.find(product => product.id === cart.productId)
        cart.product = product
    })

    res.status(200).json(new Response(true, 'Get all products in cart', carts))
})

// GET /carts/{id}: Mendapatkan detail pesanan di keranjang
app.get('/carts/:id', (req, res) => {
    const cartId = req.params.id

    const carts = readData(CART_PATH)
    const cart = carts.find(cart => cart.id === cartId)
    if (!cart) {
        res.status(404).json(new Response(false, `Cart with id ${cartId} not found`, null))
        return
    }

    const products = readData(PRODUCT_PATH)
    const product = products.find(product => product.id === cart.productId)
    if (!product) {
        res.status(404).json(new Response(false, `Product with id ${cart.productId} not found`, null))
        return
    }

    cart.product = product

    res.status(200).json(new Response(true, 'Get cart by id', cart))
})

// PUT /carts/{id}: Memperbarui detail pesanan di keranjang
app.put('/carts/:id', (req, res) => {
    const cartId = req.params.id
    const { quantity } = req.body

    const carts = readData(CART_PATH)
    const index = carts.findIndex(cart => cart.id === cartId)

    if (index !== -1) {
        const cart = carts[index]
        const products = readData(PRODUCT_PATH)
        const product = products.find(product => product.id === cart.productId)

        if (product.stock < quantity) {
            res.status(400).json(new Response(false, 'Stock not enough', null))
            return
        }

        const totalPrice = product.price * quantity
        const newCart = new Cart(cart.id, cart.productId, quantity, totalPrice)
        carts[index] = newCart

        writeData(CART_PATH, carts)

        res.status(200).json(new Response(true, 'Update cart success', null))
    } else {
        res.status(404).json(new Response(false, `Cart with id ${cartId} not found`, null))
    }
})

// DELETE /carts/{id}: Menghapus produk di keranjang
app.delete('/carts/:id', (req, res) => {
    const cartId = req.params.id

    const carts = readData(CART_PATH)

    const index = carts.findIndex(cart => cart.id === cartId)

    if (index !== -1) {
        carts.splice(index, 1)
        writeData(CART_PATH, carts)
        res.status(200).json(new Response(true, `Cart with id ${cartId} deleted`, null))
    } else {
        res.status(404).json(new Response(false, `Cart with id ${cartId} not found`, null))
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})