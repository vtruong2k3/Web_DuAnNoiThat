const express=require('express')
const productAdminController=require('../controllers/productAdminController')
const ProductAdminRouter=express.Router()
const ProductAdminController=new productAdminController()
const AuthAdminMiddleware=require('../middleware/authAdminMiddleware')
const upload=require('../middleware/upload')
ProductAdminRouter.get('/admin/product-new',AuthAdminMiddleware,ProductAdminController.getProductNew)
ProductAdminRouter.get('/admin/product',AuthAdminMiddleware,ProductAdminController.getProductAll)
ProductAdminRouter.get('/admin/count',AuthAdminMiddleware,ProductAdminController.getCountAll)
ProductAdminRouter.get('/admin/oder',AuthAdminMiddleware,ProductAdminController.getOderAll)
ProductAdminRouter.post('/admin/add-product',AuthAdminMiddleware,upload.single('image_url'),ProductAdminController.addProduct)
ProductAdminRouter.delete('/admin/product/delete/:product_id',AuthAdminMiddleware,ProductAdminController.deleteProduct)
module.exports=ProductAdminRouter