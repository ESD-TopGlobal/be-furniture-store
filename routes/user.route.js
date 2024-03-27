const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.post('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)

module.exports = router