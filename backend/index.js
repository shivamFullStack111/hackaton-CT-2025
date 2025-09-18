const express = require('express')
const cors = require('cors')
require("dotenv").config()
const mongoose = require('mongoose')
const { userRoutes } = require('./routes/userRoutes')

const app = express()

// middlewares 
app.use(cors())
app.use(express.json(

    app.listen(8888, () => {
        console.log('server running on 8888')
    })))

// db connection 
mongoose.connect(process.env.MONGOURL).then(() => {
    console.log('db connected')
}).catch((err) => {
    console.log(err.message)
})

// routes 
const router = express.Router()

// health
router.get('/api', (req, res) => {
    return res.send({ success: true, message: "server listining..." })
})

// routes 
app.use('/api/user', userRoutes)

app.listen(8888, () => {
    console.log('server running on 8888')
})

