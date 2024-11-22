const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: false, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: {type: String},
  password: { type: String, required: false },
  address: { type: String },
  phone: { type: String },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' }
},
{
  versionKey:false,
  timestamps: true     
});

const User = mongoose.model('users', userSchema);
module.exports = User;
