const jwt = require('jsonwebtoken')
const tokenSigningKey = process.env.TOKEN_SIGNING_KEY;
const mongoose = require('mongoose')
const reggex = /^(Bearer )([\w\d]{1,})(\.)([\w\d]{1,})(\.)([\w\d]{1,})$/
module.exports = function(req,res,next){
  let authorization = req.get('authorization');
  if (!reggex.test(authorization))  return res.status(500).send({error: 'Need to login first'}) 
  let userToken = authorization.split(' ')[1]  
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
 