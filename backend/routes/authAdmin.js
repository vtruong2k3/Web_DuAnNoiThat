const express=require('express')
const authAdminController=require('../controllers/authAdminController')
const AuthAdminRouter=express.Router()
const AuthAdminController=new authAdminController()
const AuthAdminMiddleware=require('../middleware/authAdminMiddleware')
const upload=require('../middleware/upload')

AuthAdminRouter.post('/admin/login',AuthAdminController.loginAdmin)
AuthAdminRouter.get('/admin/get-account',AuthAdminMiddleware,AuthAdminController.getAccount)
AuthAdminRouter.post('/admin/add-account',AuthAdminMiddleware,upload.single('avatar'),AuthAdminController.addAccount)


module.exports=AuthAdminRouter