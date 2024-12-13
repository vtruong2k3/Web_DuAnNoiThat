const express=require('express')
const authMiddleware=require('../middleware/authMiddleware')
const oderController=require('../controllers/oderController')
const OderController=new oderController()
const OderRoutes=express.Router()
OderRoutes.get('/oders',authMiddleware,OderController.getOders)
module.exports=OderRoutes