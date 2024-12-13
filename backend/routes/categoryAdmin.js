const express=require('express')
const categoryController=require('../controllers/categoryAdminController')
const categoryAdminController = require('../controllers/categoryAdminController')
const CategoryRoutes=express.Router()
const CategoryController= new categoryAdminController()
const AuthAdminMiddleware=require('../middleware/authAdminMiddleware')



CategoryRoutes.get('/admin/category',AuthAdminMiddleware,CategoryController.getCategory)
CategoryRoutes.post('/admin/add-category',AuthAdminMiddleware,CategoryController.addCategory)
module.exports=CategoryRoutes