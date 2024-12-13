const Product = require("../models/modelProduct");
const Category = require("../models/modelCategory");
const Review = require("../models/modelReview");
const { default: mongoose } = require("mongoose");
class controllerProduct {
  async getProductNew(req, res) {
    try {
      const product = await Product.find().sort({ _id: -1 }).limit(4);
      res.status(200).json({
        productData: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async getProductSofa(req, res) {
    try {
      const category = "6735d4b3f3bbec5524d6c20a";
      const product = await Product.find({ category_id: category })
        .sort({ _id: -1 })
        .limit(4);
      res.status(200).json({
        productData: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async getProductCabinet(req, res) {
    try {
      const category = "6735d559f3bbec5524d6c20b";
      const product = await Product.find({ category_id: category })
        .sort({ _id: -1 })
        .limit(4);
      res.status(200).json({
        productData: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async getProductTables(req, res) {
    try {
      const category = "6735d78e74fdab9fcf185830";
      const product = await Product.find({ category_id: category })
        .sort({ _id: -1 })
        .limit(4);
      res.status(200).json({
        productData: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async getProductChairs(req, res) {
    try {
      const category = "6735d594f3bbec5524d6c20d";
      const product = await Product.find({ category_id: category })
        .sort({ _id: -1 })
        .limit(4);
      res.status(200).json({
        productData: product,
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
        productData: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async getProductDetail(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findById(id).populate("category_id");

      res.status(200).json({
        productData: {
          ...product._doc,
          name_category: product.category_id.category_name,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async addComment(req, res) {
    try {
      const { user_id, product_id, comment } = req.body;
      if (!user_id) {
        return res.status(404).json({
          message: "Bạn chưa đăng nhập",
        });
      }
      if (!comment) {
        return res.status(404).json({
          message: "Vui lòng comment",
        });
      }
      await Review.create({
        user_id: user_id,
        product_id: product_id,
        comment,
      });
      return res.status(200).json({
        message: "Đã đăng bình luận",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async getComment(req, res) {
    try {
      const { product_id } = req.params;
      if (!product_id) {
        return res.status(400).json({
          message: "product_id không hợp lệ",
        });
      }
      const result = await Review.find({ product_id })
        .populate("user_id", "username")
        .exec();
      
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = controllerProduct;
