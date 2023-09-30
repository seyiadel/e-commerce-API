const mongoose = require('mongoose')
const Product = require('./models/productModel')

const cartItemSchema = new mongoose.Schema(
    {
        product :{ type: mongoose.Schema.Types.ObjectId, reference: "Product"},
        quantity : {type:Number, default: 1},

    }
)

const CartItem = mongoose.model('CartItem', cartItemSchema)



const cartSchema = new mongoose.Schema(
    {
        cartItem : {type: mongoose.Schema.Types.ObjectId, reference: "CartItem"}
    }
)

const Cart = mongoose.model('Cart', cartSchema)


module.exports = {CartItem, Cart}