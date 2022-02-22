const express = require("express");
const router = express.Router();
const Products = require("../models/Products");

router.post("/", (req, res) => {
  let data = req.body;
  let product = new Products(data);
  product
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/list',(req,res)=>{
  let shopId = req.userData.shop
  Products.find({shop: shopId})
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

router.get("/info/:id", (req, res) => {
  let productId = req.params.id;
  Products.findById(productId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.patch("/info/:id", (req, res) => {
  let productId = req.params.id;
  let patch = req.body;
  Products.findByIdAndUpdate(productId, patch)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
router.delete("/:id", (req, res) => {
  let productId = req.params.id;
  Products.findOneAndDelete({_id: productId, shop: req.userData.shop})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
