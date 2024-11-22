const expree=require('express')
const router=expree.Router()
const authRouter=require('./auth')


router.use("/auth",authRouter)
module.exports=router