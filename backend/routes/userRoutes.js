const express = require('express')
const { registerUser, loginUser, getAllUsers, updateUserName, getUsersByIds } = require('../controller/userController')

const userRoutes = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/users', getAllUsers)
userRoutes.put('/update-name', updateUserName) 
userRoutes.post('/get-user-by-ids', getUsersByIds) 


module.exports = {userRoutes}