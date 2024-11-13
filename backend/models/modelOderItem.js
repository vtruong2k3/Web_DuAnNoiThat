const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'orders', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
},
{
    versionKey:false,
    timestamps: trué   
});

const OrderItem = mongoose.model('orderItem', orderItemSchema);
module.exports = OrderItem;
