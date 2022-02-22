const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    descriptions: {type: String, required: true},
    mainImg: {type:String,required:true},
    variants: [{
        name: {type: String, required: true},
        img: {type: String, required: true},        
        price: Number,
    }],
    shop: {type: mongoose.Schema.Types.ObjectId, ref: "Shops"}
},{
    timestamps: true
})

module.exports = mongoose.model('Products', productSchema)
