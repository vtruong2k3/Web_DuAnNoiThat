
const Product = require("../models/modelProduct");
const Category = require("../models/modelCategory");

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

  
}

module.exports = controllerProduct;
