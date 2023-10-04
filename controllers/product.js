const Product = require('../models/product')

const createProduct = async (req, res) => {
    const product = Product(req.body)
    try{
        await product.save()
        res.status(201).json({
            "success":false,
            "message": "Product created successfully",
            "data": product
        })

    }catch (error){
        res.status(400).json({
            "success":false,
            "message": "Product not created",
            "data":error
        })
    }
}

const updateProduct = async (req, res) => {
    try{
        const product = await Product.updateOne({_id: req.params.product_id}, req.body)
        if (!product){
            res.status(404).json({
                "success":true,
                "message": "Product not found",
        })}
        res.status(200).json({
            "success":true,
            "message": "Product updated successfully",
            "data": product
        })

        } catch(error) {
            res.status(400).json({
                "success":false,
                "message": "Unable to update product",
                "data": error
            })        

    }
}

const deleteProduct = async (req, res) => {
    try{
        await Product.deleteOne({_id: req.params.product_id})
        res.status(204).json({
            "success":true,
            "message":"Product deleted successfully"
        })
    }catch (error){
        res.status(400).json({
            "success":false,
            "message":"Try again, Product cannot be deleted",
            "data":error
        })
    }

}

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find().all()
        res.status(200).json({
            "success":true,
            "message":"Products retrieved successfully",
            "data": products
        })
    }catch (error){
        res.status(200).json({
            "success":false,
            "message":"Unable to retrieve products",
            "data": error
        })
    }
}

const getSingleProduct = async (req, res) => {
    try{
        const product = await Product.findOne({_id:req.params.product_id})
        res.status(200).json({
            "success":true,
            "message":"Product retrieved successfully",
            "data": product
        })
    } catch (error){
        res.status(200).json({
            "success":false,
            "message":"Unable to retrieve product",
            "data": error
        })
    }
}

module.exports = {createProduct, updateProduct, deleteProduct, getAllProducts, getSingleProduct}