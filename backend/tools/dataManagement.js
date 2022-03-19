// All of the data preparation happens here.

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ObjectId = mongoose.mongo.ObjectID;

const { format } = require("util");
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

router.post("/user/login", (req, res, next) => {
  let device = req.headers["user-agent"];
  let { username = "", password = "" } = req.body;
  req.patch = {
    username,
    password,
    device,
  };
  next();
});

router.patch(
  "/user/information",
  upload.single("profileIMG"),
  async (req, res, next) => {
    if (req.file) {
      try {
        let link = new URL(req.session.userData.profileIMG);
        link = link.pathname.split("/web-merch.appspot.com/")[1];
        await storage.bucket("web-merch.appspot.com").file(link).delete();
      } catch (error) {
        console.log(error)
      }
      const blob = bucket.file(
        "images/avatars/" +
          new mongoose.mongo.ObjectId() +
          "." +
          req.file.mimetype.split("/")[1]
      );
      const blobStream = blob.createWriteStream();

      blobStream.on("error", (err) => {
        next(err);
      });

      blobStream.on("finish", () => {
        let newProfileIMGUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        req.body.profileIMG = newProfileIMGUrl;
        req.session.userData.profileIMG = newProfileIMGUrl;
        req.patch = {
          _id: req.session.userData._id,
          data: req.body,
        };
        next();
      });

      blobStream.end(req.file.buffer);
    } else {
      req.patch = {
        _id: req.session.userData._id,
        data: req.body,
      };
      next();
    }
  }
);
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
