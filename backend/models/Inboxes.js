const mongoose = require("mongoose");
const inboxSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shops" },
    msgs: [
      {
        type: new mongoose.Schema({
          from: String,
          body: String,
        },
       { timestamps: true}),
      },
    ],
  },
  { timestamps: true }
);

inboxSchema.statics.insertOne = function (shop_id, customer_id) {
  return new Promise(async (resolve, reject) => {
    let _id = mongoose.mongo.ObjectID();
    let Inboxes = this;
    let inbox = new Inboxes({
      _id,
      shop: mongoose.mongo.ObjectID(shop_id),
      customer: mongoose.mongo.ObjectID(customer_id),
    });
    inbox
      .save()
      .then((data) => {
        resolve(data._id);
      })
      .catch(reject);
  });
};

module.exports = mongoose.model("Inboxes", inboxSchema);
