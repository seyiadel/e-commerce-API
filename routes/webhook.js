const express = require('express')
const webhookRouter = express.Router()
const webhook = require('../controllers/webhook')

webhookRouter.post('/webhook', webhook)

module.exports = webhookRouter