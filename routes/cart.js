const express = require('express')
const cartRouter = express.Router()
const {addToCart, getTheCart, clearCart, cartCheckout} = require('../controllers/cart')
const {userAuth} = require('../middlewares/auth')

cartRouter.post('/add-to-cart', addToCart)
cartRouter.post('/clear-cart', clearCart)
cartRouter.get('/get-cart', getTheCart)
cartRouter.post('/checkout-cart', userAuth, cartCheckout)


module.exports = cartRouter