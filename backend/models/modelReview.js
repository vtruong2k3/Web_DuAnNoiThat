const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  rating: { type: Number, required: false, min: 1, max: 5 },
  comment: { type: String, required:true},
  review_date: { type: Date, default: Date.now }
},
{
  versionKey:false,
  timestamps: true    
}
);

const Review = mongoose.model('reviews', reviewSchema);
module.exports = Review;
