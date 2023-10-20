const express = require('express')
const webhookRouter = express.Router()
const {webhook, healthCheckPath} = require('../controllers/webhook')

webhookRouter.post('/webhook', webhook)
webhookRouter.post('/healthcheck', healthCheckPath)

module.exports = webhookRouter