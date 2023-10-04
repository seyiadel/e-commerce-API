const express = require('express')
const productRouter = express.Router()
const {createProduct, updateProduct, deleteProduct, getAllProducts, getSingleProduct} = require('../controllers/product')

productRouter.route('/products').post(createProduct).get(getAllProducts)
productRouter.route('/product/:product_id').get(getSingleProduct).put(updateProduct).delete(deleteProduct)


module.exports = productRouter