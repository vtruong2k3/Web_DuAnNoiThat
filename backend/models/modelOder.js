const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  name: {type: String, required: true},
  address: {type: String, required: true},
  phone: {type: String, required: true},
  oders_code: {type: String , default: `ODERS-CODE${Date.now()}`},
  order_date: { type: Date, default: Date.now() },
  total_amount: { type: Number, required: true },
  status: { type: String, enum: ['Đang chờ xử lý', 'Đã xác nhận', 'Đang chuẩn bị hàng','Đang vận chuyển', 'Đã giao hàng', 'Đã hủy'], default: 'Đang chờ xử lý' }
},
{
  versionKey:false,
  timestamps: true     
});

const Order = mongoose.model('oders', orderSchema);
module.exports = Order;
