const express=require('express')
const productController=require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const ProductRouter=express.Router()
const ProductController= new productController()

ProductRouter.get('/product/new',ProductController.getProductNew)
ProductRouter.get('/product/sofa',ProductController.getProductSofa)
ProductRouter.get('/product/cabinet',ProductController.getProductCabinet )
ProductRouter.get('/product/tables',ProductController.getProductTables )
ProductRouter.get('/product/chairs',ProductController.getProductChairs)
ProductRouter.get('/product/product-all',ProductController.getProductAll)
ProductRouter.get('/product/:id',ProductController.getProductDetail)
ProductRouter.post('/product/comment',ProductController.addComment)
ProductRouter.get('/product/comment/:product_id',ProductController.getComment)
module.exports=ProductRouter