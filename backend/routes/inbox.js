const express = require("express");
const router = express.Router();
const Inboxes = require("../dataInterfaces/Inboxes")


router.get("/", async (req,res)=>{ 
   let shop_id = req.body.shop;
   let customer_id = req.userData._id;
   Inboxes.getId(shop_id,customer_id)
.then((data)=>{res.send(data)})
.catch((err)=>{res.status(500).send(err)})

})

router.get("/userMsgs",(req,res)=>{
  Inboxes.getUserMsgs(req.userData._id)
  .then((data)=>{res.send(data)})
  .catch((err)=>{res.status(500).send(err)})
})
router.get("/msgs/:id/:page/:from",(req,res)=>{
    let query = req.query;
    let page = req.params.page;
    Inboxes.getMsgs(query,page)
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.status(500).send(err)})
})

router.post("/:id",(req,res)=>{
    let {query , data} = req.patch;
    Inboxes.addMsg(query,data)
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.status(500).send(err)})
})


module.exports = router;



