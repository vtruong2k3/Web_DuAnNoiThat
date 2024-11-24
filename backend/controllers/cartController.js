const mongoose = require("mongoose");
const Product = require("../models/modelProduct");
const Cart = require("../models/modelCart");

class cartController {
  async addToCart(req, res) {
    try {
      const { user_id, product_id, quantity } = req.body;

      if (
        !mongoose.Types.ObjectId.isValid(user_id) ||
        !mongoose.Types.ObjectId.isValid(product_id)
      ) {
        return res.status(400).json({ message: "ID không hợp lệ" });
      }

      const productCheck = await Product.findById(product_id);

      if (!productCheck) {
        return res.status(404).json({
          message: "Sản phẩm không tồn tại",
        });
      }

      const checkCart = await Cart.findOne({ user_id, product_id });

      if (checkCart) {
        const updateCart = await Cart.findOneAndUpdate(
          { user_id, product_id },
          { $inc: { quantity: quantity } },
          { new: true }
        );

        return res.status(200).json({
          message: "Cập nhật sản phẩm vào giỏ hàng thành công",
          data: updateCart,
        });
      } else {
        const newCart = await Cart.create({
          user_id: new mongoose.Types.ObjectId(user_id),
          product_id: new mongoose.Types.ObjectId(product_id),
          quantity,
        });

        return res.status(200).json({
          message: "Thêm sản phẩm vào giỏ hàng thành công !",
          data: newCart,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getCart(req, res) {
    try {
      const { user_id } = req.params;

      const resutlt = await Cart.find({ user_id })
        .populate("product_id", "product_name price image_url")
        .exec();
      console.log(resutlt);

      if (!resutlt || resutlt.length === 0) {
        return res.status(404).json({
          message: "Giỏ hàng rỗng",
        });
      }
      const cartItems = resutlt.map((item) => ({
        product_id: item.product_id._id,
        product_name: item.product_id.product_name,
        price: item.product_id.price,
        image_url: item.product_id.image_url,
        quantity: item.quantity,
        totalPrice: item.quantity * item.product_id.price,
      }));
      console.log(cartItems);
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      return res.status(200).json({
        message: "Lấy giỏ hàng thành công",
        
          data:{
            cartItems,
          },
          totalAmount,
        
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = cartController;
