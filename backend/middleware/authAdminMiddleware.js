const jwt=require('jsonwebtoken')
const User=require('../models/modelUser')
const authAdminMiddleware=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({
                message:"Bạn chưa đăng nhập"
            })
        }
        const decoded=await jwt.verify(token,process.env.KEY_TOKEN)
        const user=await User.findById(decoded.id)

        if(user.role !== 'admin'){
            
            return res.status(401).json(
               { message:"Bạn không phải admin "}
            )
        }
        req.user=user
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
module.exports=authAdminMiddleware