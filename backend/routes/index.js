const expree=require('express')
const router=expree.Router()
const authRouter=require('./auth')
const ProductRouter=require('./productRoutes')
const CartRouter=require('./cartRoutes')
router.use("/auth",authRouter)
router.use("/api",ProductRouter)
router.use("/api",CartRouter)
module.exports=router