const express = require('express')
const { registerUser, loginUser, getAllUsers, updateUserName } = require('../controllers/userController')

const userRoutes = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/users', getAllUsers)
userRoutes.put('/update-name', updateUserName)

module.exports = { userRoutes }