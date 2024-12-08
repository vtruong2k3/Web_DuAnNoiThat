const express=require('express')
const cartController=require('../controllers/cartController')
const authMiddleware=require('../middleware/authMiddleware')
const CartRouter=express.Router()
const CartController= new cartController()


CartRouter.post('/product/add-to-cart', CartController.addToCart)
CartRouter.put('/product/update-quantity', CartController.updataQuantity)
CartRouter.get('/product/get-cart/:user_id',CartController.getCart)
CartRouter.delete('/product/delete-product-cart/:product_id', authMiddleware, CartController.deleteProductCart);
CartRouter.post('/product/check-out',CartController.checkOutProduct)
CartRouter.get('/product/bill/:oder_id',CartController.getBill)
module.exports=CartRouter