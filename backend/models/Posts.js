const mongoose = require('mongoose');
const postSchema = mongoose.Schema({     
    shop:{type: mongoose.Schema.Types.ObjectId, ref: "Shops"},
    body: String,
    images: [{type: String}]
},{
    timestamps: true
})

module.exports = mongoose.model('Posts', postSchema)
