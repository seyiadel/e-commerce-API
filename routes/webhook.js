const express = require('express')
const webhookRouter = express.Router()
const {webhook, healthCheckPath} = require('../controllers/webhook')

webhookRouter.post('/webhook', webhook)
webhookRouter.get('/healthcheck', healthCheckPath)

module.exports = webhookRouter