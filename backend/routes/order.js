const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");

router.post("/new/:id", (req, res) => {
  let order = new Orders(req.body);
  order
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((data) => {
      res.status(500).send({ data });
    });
});

router.get("/user", (req, res) => {
  let customerId = req.userData._id;
  Orders.find({ customer: customerId })
    .then((data) => {
      res.send(data);
    })
    .catch((data) => {
      res.status(500).send(data);
    });
});
router.get("/shop", (req, res) => {
  let shopId = req.userData.shop;
  Orders.find({ shop: shopId })
    .then((data) => {
      res.send(data);
    })
    .catch((data) => {
      res.status(500).send(data);
    });
});
router.get("/info/:id", (req, res) => {
  let { orderId } = req.local;
  Orders.findById(orderId)
    .then((data) => {
      res.send(data);
    })
    .catch((data) => {
      res.status(500).send(data);
    });
});

router.patch("/status/:orderId/:statusId", (req, res) => {
  let {orderId,patch} = req.local;
  Orders.findByIdAndUpdate(orderId, patch)
    .then((data) => {
      res.send(data);
    })
    .catch((data) => {
      res.status(500).send(data);
    });
});
module.exports = router;
