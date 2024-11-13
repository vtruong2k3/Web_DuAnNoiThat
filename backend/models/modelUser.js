const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: {type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' }
},
{
  versionKey:false,
  timestamps: true     
});

const User = mongoose.model('users', userSchema);
module.exports = User;
