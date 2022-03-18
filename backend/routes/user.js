const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const db = require("../dataInterfaces/Users");

router.post("/registration", (req, res) => {
  db.register(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((mongoError) => {
      let error;
      if (mongoError?.keyPattern?.username)
        error = "Username is already taken.";
      if (mongoError?.keyPattern?.contact)
        error = "Phone number is already taken.";
      res.status(500).send({ error, mongoError });
    });
});

router.post("/login",  (req, res) => {
  db.login(req.patch)
    .then(({ accessToken, userData }) => {
      req.session.userData =  userData; 
      res.status(200).send({ userData, accessToken });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/information", (req, res) => {
  db.getInfo(req.session.userData._id)
    .then((userData) => { 
      req.session.userData = Object.assign({},userData)
      res.send(userData);
    })
    .catch((error) => {
      res.status(500).send({error: "not found"});
    });
});

router.patch("/information", (req, res) => {
  db.updateInfo(req.patch)
    .then(() => { 
      res.send(req.patch); 
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/feed", async (req, res) => {
  db.getFeed(req.session.userData._id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/logout", (req, res) => {
 req.session.destroy((err)=>{
   if (err) return res.status(500).send(err)
   res.sendStatus(200);
 })
});

module.exports = router;
