// All of the data preparation happens here.


const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ObjectId = mongoose.mongo.ObjectID;

router.post("/user/login", (req, res, next) => {
  let device = req.headers['user-agent'];
  let { username = "", password = "" } = req.body;
  req.patch = {
    username,
    password,
    device,
  };
  next();
});

router.patch("/user/information", (req, res, next) => {
  req.patch = {
    _id: req.userData._id,
    data: req.body,
  };
  next();
});
router.post("/user/register", (req, res, next) => {
  const userData = req.body;
  userData._id = new mongoose.mongo.ObjectId();
  userData.shop = new mongoose.mongo.ObjectId();
  next();
});

router.get("/inbox", (req, res, next) => {
  let { shop } = req.body;
  if (typeof shop != "string") return res.send({ error: "Invalid Data" });
  try {
    req.body.shop = mongoose.mongo.ObjectID(shop);
  } catch (error) {
    return res.send(error);
  }
  next();
});

router.post("/inbox/:id", (req, res, next) => {
  req.patch = {
    data: { $push: { msgs: req.body } },
    query:
      req.body.from === "customer"
        ? { customer: req.userData._id }
        : { shop: req.userData.shop },
  };
  next();
});

router.get("/inbox/msgs/:id/:page/:from", (req, res, next) => {
  let { id = "", page = "", from = "" } = req.params;
  req.params.page = parseInt(req.params.page) || 1;
  let query =
    from === "customer"
      ? { customer: req.userData._id }
      : { shop: req.userData.shop };
  query._id = id;
  next();
});

router.post("/product", (req, res, next) => {
  req.body.shop = req.userData.shop;
  next();
});

router.get("/product/info/:id", (req, res, next) => {
  req.params.id = mongoose.mongo.ObjectID(req.params.id);
  next();
});

router.patch("/product/info/:id", (req, res, next) => {
  req.params.id = mongoose.mongo.ObjectID(req.params.id);
  next();
});

router.post("/order/new/:shopId", (req, res, next) => {
  let shopId = "";
  try {
    shopId = mongoose.mongo.ObjectID(req.params.shopId);
  } catch (e) {
    return res.status(500).send({ error: "shop Id was invalid." });
  }
  let { shop, items, total } = req.body;
  req.body = {
    _id: mongoose.mongo.ObjectID(),
    shop,
    items,
    total,
    customer: req.userData._id,
    shop: shopId,
  };
  next();
});

router.get("/order/info/:id", (req, res, next) => {
  try {
    req.local = {
      orderId: mongoose.mongo.ObjectID(req.params.id),
    };
  } catch (data) {
    res.send({ error: "Order Id was invalid" });
  }
  next();
});

router.patch("/order/status/:orderId/:statusId", (req, res, next) => {
  let statusId = parseInt(req.params.statusId);
  let statusCode = ["processing", "packed", "on delivery", "delivered"];
  let status = statusCode[statusId];
  if (!status)
    return res.status(500).send({ error: "Invalid order status code" });
  req.local = {
    orderId: ObjectId(req.params.orderId),
    patch: { status },
  };
  next();
});

module.exports = router;
