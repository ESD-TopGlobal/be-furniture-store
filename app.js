const express = require('express')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const router = require('./routes/routes')

const PORT = 3010

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())

app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})