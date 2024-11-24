const express=require('express')
const productController=require('../controllers/productController')
const ProductRouter=express.Router()
const ProductController= new productController()

ProductRouter.get('/product/new',ProductController.getProductNew)
ProductRouter.get('/product/:id',ProductController.getProductDetail)

module.exports=ProductRouter