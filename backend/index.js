const express = require('express')
const cors = require('cors')
require("dotenv").config()
const mongoose = require('mongoose')
const { userRoutes } = require('./routes/userRoutes')
const { sessionRoutes } = require('./routes/SessionRoute')
const { initializeSocket } = require('./socket')
const http=require('http')


const app = express()

// middlewares 
app.use(cors())
app.use(express.json())

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
app.use('/api/session', sessionRoutes)

// **create HTTP server and attach socket**
const server = http.createServer(app)
const io = initializeSocket(server)

// listen
server.listen(8888, "0.0.0.0", () => {
  console.log("server and socket running on 0.0.0.0:8888");
});
