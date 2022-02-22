const mongoose = require("mongoose");
const Inboxes = require("../models/Inboxes");
const Users = require("../models/Users");
const Shops = require("../models/Shops");

function createOne(shop, customer) {
  return new Promise((resolve, reject) => {
    let inbox_id = mongoose.mongo.ObjectID();
    Shops.findByIdAndUpdate(
      { _id: shop },
      {
        $push: { inbox: inbox_id },
      }
    )
      .then((data) => {
        if (!data) reject("shop id invalid");
        Users.findByIdAndUpdate(
          { _id: customer },
          {
            $push: { inbox: inbox_id },
          }
        )
          .then((data) => {
            if (!data) reject("customer id invalid " + customer);
            let inbox = new Inboxes({
              _id: inbox_id,
              shop,
              customer,
            });
            inbox.save().then(resolve).catch(reject);
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

function getId(shop, customer) {
  return new Promise((resolve, reject) => {
    Inboxes.findOne({ shop, customer }, "_id")
      .then((data) => {
        if (data) resolve(data);
        createOne(shop, customer).then(resolve).catch(reject);
      })
      .catch(reject);
  });
}

function getMsgs(query, page) {
  return new Promise((resolve, reject) => {
    Inboxes.findOne(query, {
      msgs: {
        $slice: [-10 * page, 10],
      },
    })
      .populate({ path: "customer", select: "firstname lastname -_id" })
      .populate({ path: "shop", select: "name -_id" })
      .then(resolve)
      .catch(reject);
  });
}

function getUserMsgs(_id) {
  return new Promise((resolve, reject) => {
    Users.findById(_id, "inbox -_id")
      .populate([
        {
          path: "inbox",
          select: { msgs: { $slice: -1 } },
          options: { sort: { updatedAt: -1 } },
          populate: [
            { path: "customer", select: "firstname -_id" },
            { path: "shop", select: "name -_id" },
          ],
        },
      ])
      .then((data) => {
        resolve(data.inbox);
      })
      .catch(reject);
  });
}

function addMsg(query,data){
  return new Promise((resolve,reject)=>{
    Inboxes.findOneAndUpdate(query,data)
    .then(resolve)
    .catch(reject)
  })
}

module.exports = {
  getId,
  getMsgs,
  getUserMsgs,
  addMsg
};
