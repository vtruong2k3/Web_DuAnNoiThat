const mongoose = require("mongoose");
const Product = require("../models/modelProduct");
const Cart = require("../models/modelCart");
const Oders = require("../models/modelOder");
const OrderItem = require("../models/modelOderItem");
const { json } = require("body-parser");
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
  async updataQuantity(req, res) {
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

      const checkCart = await Cart.find({ user_id, product_id });

      if (checkCart) {
        const updateCart = await Cart.findOneAndUpdate(
          { user_id, product_id },
          { quantity: quantity },
          { new: true }
        );

        return res.status(200).json({
          message: "Cập nhật sản phẩm vào giỏ hàng thành công",
          data: updateCart,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async checkOutProduct(req, res) {
    const odersCode = `ODER-SHOP-${Date.now()}`;
    const { user_id, name, address, phone,note, totalAmount } = req.body;

    // kiểm tra giỏ hàng
    const cart = await Cart.find({ user_id })
      .populate("product_id", "price")
      .exec();
    if (cart.length === 0) {
      return res.status(404).json({
        message: "Giỏ hàng rỗng",
      });
    }
    // thêm thông tin vào oder
    const oders = await Oders.create({
      user_id: user_id,
      name: name,
      address: address,
      phone: phone,
      note:note,
      oders_code: odersCode,
      total_amount: totalAmount,
    });

    if (!oders) {
      return res.status(400).json({
        message: "Đặt hàng thất bại",
        odersCode
      });
    }

    // thêm sản phẩm vàio oderItem
    const oderId = oders._id;
    const orderItems = cart.map((item) => ({
      order_id:new mongoose.Types.ObjectId(oderId),
      product_id: new mongoose.Types.ObjectId(item.product_id._id),
      quantity: item.quantity,
      price: item.product_id.price,
     
    }));
   
  
    const addedOrderItems = await OrderItem.insertMany(orderItems);
   
    if (!addedOrderItems || addedOrderItems.length === 0) {
      return res.status(400).json({ message: "Lỗi khi thêm sản phẩm vào đơn hàng." });
    }
    await Cart.deleteMany({user_id})
   return res.status(200).json({
      message: "Bạn đã đặt hàng thành công",
      oder_id:oderId
    });
  }
  async getCart(req, res) {
    try {
      const { user_id } = req.params;

      const resutlt = await Cart.find({ user_id })
        .populate("product_id", "product_name price image_url")
        .exec();

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

      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      const totalQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return res.status(200).json({
        message: "Lấy giỏ hàng thành công",

        data: {
          cartItems,
        },
        totalAmount,
        totalQuantity,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteProductCart(req, res) {
    try {
      const { product_id } = req.params;
      const user_id = req.user.id;

      const deletedProduct = await Cart.findOneAndDelete({
        user_id,
        product_id,
      });

      if (!deletedProduct) {
        return res.status(404).json({ message: "Không xóa được sản phẩm" });
      }
      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async getBill(req,res){
    try {
      const{oder_id}=req.params

      if(!oder_id){
        return res.status(404).json({
          message:"Không thấy thông tin đơn hàng"
        })
      }

      const result=await Oders.findById(oder_id)
      console.log(result);
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

module.exports = cartController;
