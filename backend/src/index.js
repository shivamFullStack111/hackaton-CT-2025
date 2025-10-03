const dotenv = require('dotenv')
const connectDB = require("./db/index.js")
const express = require('express')
const app = express()
dotenv.config()

dotenv.config({
    path: "./env"
})

const port = process.env.PORT || 8080
console.log(process.env.DB_URL)

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port http://locahost:${port}`);
        })
    })
    .catch((err) => {
        console.log("Error connecting DB: ", err);
    })