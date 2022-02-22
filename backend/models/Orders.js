const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shop: {type: mongoose.Schema.Types.ObjectId, ref: "Shops"},
    customer: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    items:[
        {name: String,
        variant: String,
        price: Number,
        quantity: Number,
        measurement: String,
        subTotal: Number
    }],
    total: Number,
    status: String
  },
{
    timestamps: true
})


module.exports = mongoose.model("Orders", orderSchema)