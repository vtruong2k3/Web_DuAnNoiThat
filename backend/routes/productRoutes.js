const express=require('express')
const productController=require('../controllers/productController')
const ProductRouter=express.Router()
const ProductController= new productController()



module.exports=ProductRouter