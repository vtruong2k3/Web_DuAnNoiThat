const Order=require('../models/modelOder')
class oderController {
    async getOders(req,res){
        try {
            const {id}=req.user
            const result=await Order.find({user_id:id})
            return res.status(200).json({
                data:result
            })
            
        } catch (error) {
            return res.status(500).json({
                message: error.message,
              });
        }
    }
}
module.exports=oderController