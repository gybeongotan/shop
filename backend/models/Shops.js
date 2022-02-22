const mongoose = require('mongoose');
const Inboxes = require('./Inboxes');
const Users = require('./Users');
const shopSchema = mongoose.Schema({
    name: {type: String, unique: true},
    img: {
        wallpaper: {type:String,default: '/nowallpaper.jpg'},
        gallery: [
            {
                _id: mongoose.mongo.ObjectID,
                url: String,
                alt: String
            }
        ]
    },
    description: {type: String, require: true,default:'You can edit you shop page using the Edit Info link below.'},
    followers: {
        count: Number,
        people: String,
    },
    ratings: {ratedBy: [{name: String, rated: {type: Number,min:0, max: 5} }], average: Number},
    inbox: [{type: mongoose.Schema.Types.ObjectId, ref:"Inboxes"}],
    customers: [{type: mongoose.Schema.Types.ObjectId, ref: "Users"}],
    contacted_person: [{type: mongoose.Schema.Types.ObjectId, ref: "Users"}],
    published: {type: Boolean, default: false},
    owner:{type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Posts"}],
    location:[String],
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "Products"}],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }]
},{
    timestamps: true
})


shopSchema.statics.checkExistingInbox = function(shop_id,customer_id){
    return new Promise((resolve,reject)=>{
        this.findById({_id: shop_id}, "inbox")
        .populate({
            path: "inbox",
            select: "_id",
            match: {customer: customer_id}
        })
        .then(data=>resolve({data}))
        .catch(error=> reject({error}))
    })
}
 

shopSchema.statics.getInboxId = function(shop_id,customer_id){
    return new Promise(async(resolve,reject)=>{
        
   let {error,data} = await this.checkExistingInbox(shop_id,customer_id)
   if(error) reject({error});
   if (data.inbox.length > 0) resolve({data: data.inbox[0]._id})
    
   Inboxes.insertOne(shop_id,customer_id) 
   .then(data=>resolve({data})).catch(error=>reject({error}))
})
}
module.exports = mongoose.model('Shops', shopSchema)

