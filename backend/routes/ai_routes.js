const express = require('express')
const { personalized_chat } = require('../controller/ai_controller')

const aiRouter = express.Router()

aiRouter.post('/personalized-chat', personalized_chat)

module.exports = { aiRouter }