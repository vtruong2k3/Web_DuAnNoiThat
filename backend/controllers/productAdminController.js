const Product = require("../models/modelProduct");
const User = require("../models/modelUser");
const Oders = require("../models/modelOder");
class productAdminController {
  async getProductNew(req, res) {
    try {
      const product = await Product.find().sort({ _id: -1 }).limit(10);
      res.status(200).json({
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async getProductAll(req, res) {
    try {
      const product = await Product.find();
      res.status(200).json({
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async getCountAll(req, res) {
    try {
      const product = await Product.countDocuments();
      const user = await User.countDocuments();
      const oders = await Oders.countDocuments();
      res.status(200).json({
        totalAccounts: user,
        totalProduct: product,
        totalOders: oders,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async getOderAll(req, res) {
    try {
      const oder = await Oders.find();
      if (!oder) {
        return res.status(404).json({
          message: "Không có đơn hàng nào",
        });
      }
      res.status(200).json({
        data: oder,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async addProduct(req, res) {
    try {
      const {
        product_name,
        price,
        category_id,
        description,
        material,
        dimensions,
        stock_quantity,
      } = req.body;
      const image_url = req.file ? req.file.filename : null;

      const product = await Product.create({
        product_name,
        price,
        category_id,
        description,
        material,
        dimensions,
        stock_quantity,
        image_url,
      });
      if (!product) {
        return res.status(404).json({
          message: "Thêm sản phẩm thất bại",
        });
      }
      return res.status(200).json({
        message: "Thêm sản phẩm thành công",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async deleteProduct(req,res){
    try {
      const {product_id}=req.params
      if(!product_id){
        return res.status(400).json({
          message:"Không thấy id"
        })
        
      }
      await Product.findByIdAndDelete(product_id)
      return res.status(200).json({
        message:"Xóa sản phẩm thành công"
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
module.exports = productAdminController;
