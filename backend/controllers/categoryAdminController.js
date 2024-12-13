const Category=require('../models/modelCategory')

class categoryAdminController {
    async getCategory(req,res){
        try {
            const category=await Category.find()
            return res.status(200).json({
                data:category
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message,
              });
        }
    }

    async addCategory(req,res){
        try {
            const {category_name}=req.body
            const checkCatrgory=await Category.findOne({category_name})
            if(checkCatrgory){
                return res.status(404).json({
                    message:"Danh mục đã tồn tại"
                })
            }
            await Category.create({
                category_name
            })
            return res.status(200).json({
                message:"Thêm danh mục thành công"
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message,
              });
        }
    }
}

module.exports=categoryAdminController