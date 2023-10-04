const Product = require('../models/product')
const Cart = require('../models/cart')

const addToCart = async (req, res) => {
    let productId = req.body
    let quantity = req.body.quantity
    
    try{
        let cart = Cart.find().populate('cartItems.productId')
        const productDetail = await Product.findOne({_id:productId})

        if(!productDetail) {
            res.status(404).json({
                    "success":true,
                    "message" :`Product ${productId} does not exist`
            })
        }

    
        // If Cart Exists
        if (cart){
            const indexFound = cart.cartItems.findIndex(cartItem => cartItem.productId.id == productId)
            if (indexFound !== -1 && quantity <= 0){
                cart.cartItems.splice(indexFound, 1);
                if (cart.cartItems.length == 0){
                    cart.subTotal = 0;
                }else{
                    cart.subTotal = cart.cartItems.map(cartItem => cartItem.total).reduce((total, next) => total + next);
                }
            }
                // If product exist, add the previous quantity to the new quantity
            else if(indexFound !== -1){
                cart.cartItems[indexFound].quantity = cart.cartItems[indexFound].quantity + quantity;
                cart.cartItems[indexFound].total = cart.cartItems[indexFound].quantity * productDetail.price;
                cart.subTotal = cart.cartItems.map(cartItem => cartItem.total).reduce((total, next) => total + next);

            }

            else if(quantity > 0) {
                cart.cartItems.push({
                    "productId": productId,
                    "quantity": quantity,
                    "total": parseInt(productDetail.price * quantity)
                })
                cart.subTotal = cart.cartItems.map(cartItem => cartItem.total).reduce((total, next) => total + next);
            }
            
            else {
                return res.status(400).json({
                    "success":false,
                    "message":"Invalid Request"
                })
            }

            let data = await cart.save();
            res.status(200).json({
                "success":true,
                "message": "Added to Cart",
                "data": data
            })
            
        }
        else{
            let cartData = {
            "cartItems":[{
                'productId':productId,
                'quantity': quantity
            }],
            "subTotal": productDetails.price * quantity }

            const cart = await Cart.create(cartData)
            res.status(201).json({
                    "success":true,
                    "message": "Cart Created",
                    "data": cart
            })
        }
    } catch(error){
        res.status(400).json({
            "success":false,
            "message": "Something went wrong with the CART",
            "data": error
        })
    }   
}


const getTheCart = async (req, res) => {
    try{
        const cart =await Cart.find().populate('cartItems.productId')
        if(!cart){
            return res.status(404).json({
                "success":true,
                "message": "No Cart Found",
                "data": cart
            })
        }
        res.status(200).json({
            "success":true,
            "message": "Cart Retrieved",
            "data": cart
        })
    } catch(error){
        console.log(error)
        res.status(400).json({
            "success":false,
            "message": "Something went wrong with the Cart",
            "data": error
        })
    } 
}
    
const clearCart = async (req, res) => {
    try{
        const cart = await Cart.find().populate('cartItems.productId')
        cart.cartItems = []
        cart.subTotal = 0

        let data = await cart.save()     
        res.status(200).json({
            "success":true,
            "message": "Cart cleared",
            "data": data
        })   
    }catch (error){
        console.log(error)
        res.status(400).json({
            "success":false,
            "message": "Something went wrong with the Cart",
            "data": error
        })
    }
   
}
    //atribute to be added : cartOwner = req.user.id

module.exports = {addToCart, getTheCart, clearCart}