const express = require('express')
const cartRouter = express.Router()
const {addToCart, getTheCart, clearCart} = require('../controllers/cart')

cartRouter.post('/add-to-cart', addToCart)
cartRouter.post('/clear-cart', clearCart)
cartRouter.get('/get-cart', getTheCart)


module.exports = cartRouter