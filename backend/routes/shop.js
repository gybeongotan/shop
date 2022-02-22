const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const express = require("express");
const Users = require('../models/Users');
const Shops = require('../models/Shops');
const Products = require('../models/Products')
const router = express.Router();


router.get('/info',(req,res)=>{ 
    let shopId = mongoose.mongo.ObjectId(req.userData.shop) 
    Shops.findById(shopId)
    .then(data => res.send(data))
    .catch(error=> res.status(300).send({error}))
})

router.patch('/info',(req,res)=>{
    let id = req.userData.shop;
    let patch = req.body;
    Shops.findByIdAndUpdate(id,patch)
    .then((data)=>{
        res.status(200).send({res: data})
    })
    .catch(error=>{res.send(error)})
})

router.get('/info/:id',(req,res)=>{
    let id = req.params.id;
    Shops.findById(id)
    .populate({
        path: 'posts',
        options: {
          limit: 20
        }
    })
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch(error=>{res.send(error)})
})

router.get('/search/:page',(req,res)=>{
    let page = req.params.page
    let {location="taytay,rizal", name="", type=""} = req.body;
    Shops.find({published: true,$or:[{location},{name},{type}]})
    .skip(page * 20).limit(20)
    .then((data)=>{
        res.send(data)
    })
    .catch(error=>{res.send(error)})
})

router.get('/product/info/:id',(req,res)=>{
    Products.findById(req.params.id)
    .then(data=>{
        res.send(data)
    })
    .catch((error)=>{
        res.status(404).send({error})
    })
})

router.post("/product",(req,res)=>{
    let productInfo = req.body;
        // productInfo._id = mongoose.mongo.ObjectID();
    let product = new Products(productInfo);
    product.save()
    .then((data)=>{
        Shops.findByIdAndUpdate(req.userData.shop,{
            $push: {products: data._id}
        })
        .then(()=>{ res.sendStatus(200)})
        .catch()
    })
    .catch((error)=>{
        res.status(404).send({error})
    })
})

router.delete("/product/:id",(req,res)=>{
    let id = req.params.id
    Products.findByIdAndDelete(id)
    .then(()=>{
        res.sendStatus(200)
    })
    .catch(error=>{res.send(error)})
})

router.patch("/product/:id", (req,res)=>{
    let id = req.params.id
    let patch = req.body;
    Products.findByIdAndUpdate(id, patch)
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch(error=>{res.send(error)})
})

router.get('/produtcs/list/:sid/:pageNumber',(req,res)=>{
     let {sid=0,pageNumber=0} = req.params;
     Shops.findById(sid)
     .populate({
         path: "posts",
         options:{
             limit: 20,
             skip: pageNumber * 20
         }
     })
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch(error=>{res.send(error)})
})

router.get('/testing',(req,res)=>{
    Shops.find({location: {$in:["pasig"]}})
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch(error=>{res.send(error)})
})


router.get("/orders/:pageNumber",(req,res)=>{
    let pageNumner = parseInt(req.params.pageNumber) || 1; 
    Shops.findById(req.userData.shop)
     .populate({
         path: "orders"
     })
     .then((data)=>{
         res.status(200).send(data)
     })
     .catch(error=>{res.send(error)})
}) 
module.exports = router

