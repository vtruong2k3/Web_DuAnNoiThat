const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'categorys', required: true },
  material: { type: String, required: true },
  dimensions: { type: String, required: true },
  stock_quantity: { type: Number, required: true },
  image_url: { type: String }
},
{
    versionKey:false,
    timestamps: true   
});

const Product = mongoose.model('products', productSchema);
module.exports = Product;
