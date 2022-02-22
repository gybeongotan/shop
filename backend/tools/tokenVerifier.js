const jwt = require('jsonwebtoken')
const tokenSigningKey = process.env.TOKEN_SIGNING_KEY;
const mongoose = require('mongoose')
module.exports = function(req,res,next){
  let userToken = req.cookies.accessToken;
  let clientDevice = req.headers["user-agent"]; 
  jwt.verify(userToken,tokenSigningKey,(err,userData)=>{
    if(err) return res.status(400).send({err}) 
    if(userData.device!== clientDevice) return res.status(505).send({error: "need to login"})
    req.userData =  userData;
    req.userData._id = mongoose.mongo.ObjectID(userData.userId)
    req.shop = mongoose.mongo.ObjectID(userData.shop);
    next();
  })
}
 