const express = require('express')
const productRouter = express.Router()
const {createProduct, updateProduct, deleteProduct, getAllProducts, getSingleProduct} = require('../controllers/product')
const {adminAuth} = require('../middlewares/auth')

// Admin Endpoints
productRouter.route('/admin/products').post(adminAuth, createProduct).get(getAllProducts)
productRouter.route('/admin/product/:product_id').get(getSingleProduct).put(adminAuth, updateProduct).delete(adminAuth, deleteProduct)

// User Endpoints
productRouter.get('/product/:product_id',getSingleProduct) 
productRouter.get('/products', getAllProducts)


module.exports = productRouter
