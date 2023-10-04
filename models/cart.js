const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema(
    {
        productId :{ type: mongoose.Schema.Types.ObjectId, ref: "Product"},
        quantity : {type:Number, default: 1},
        total : {type:Number, required:true}

    }
)


// Main Cart
const cartSchema = new mongoose.Schema(
    {
        cartItems : [cartItemSchema],
        subTotal: {type:Number, default:0}
    }
)

const Cart = mongoose.model('Cart', cartSchema)


module.exports = Cart