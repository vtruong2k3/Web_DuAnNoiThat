const express=require('express')
const cartController=require('../controllers/cartController')
const CartRouter=express.Router()
const CartController= new cartController()


CartRouter.post('/product/add-to-cart', CartController.addToCart)
CartRouter.get('/product/get-cart/:user_id',CartController.getCart)
module.exports=CartRouter