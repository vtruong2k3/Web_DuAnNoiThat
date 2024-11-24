const mongoose=require('mongoose')


const cartSchema= new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:"users", required: true},
    product_id:{type:mongoose.Schema.Types.ObjectId, ref:"products", required: true},
    quantity:{type: Number, required: true},

},
{
    versionKey:false,
    timestamps: true  
})
const Cart=mongoose.model('carts',cartSchema)
module.exports=Cart