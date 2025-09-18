const express = require('express')
const app = express() 
const cors  = require('cors')

const http = require('http')
const {Server} = require('socket.io')

app.use(cors)
app.use(express.json())

// create http server 
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})


io.on("connection",(socket)=>{
    console.log("user Connected",socket.id)

    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
    });
})

server.listen(8788,()=>{
    console.log('server running on 8788')
})