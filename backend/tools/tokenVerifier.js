const jwt = require('jsonwebtoken')
const tokenSigningKey = process.env.TOKEN_SIGNING_KEY;
const mongoose = require('mongoose')
const regex = /^Bearer [\w-]+\.[\w-]+\.[\w-]+$/
module.exports = function(req,res,next){
  if(req.session.userData) return next();
  let authorization = req.get('authorization'); 
  if (!regex.test(authorization))  return res.status(500).send({error: 'Invalid Token'}) 
  let userToken = authorization.split(' ')[1]  
  let clientDevice = req.headers["user-agent"]; 
  jwt.verify(userToken,tokenSigningKey,(err,userData)=>{
    if(err) return res.status(400).send({err})  
    if(userData.device!== clientDevice) return res.status(505).send({error: "Need to login"})
    req.session.userData =  userData;
    req.session.userData._id = mongoose.mongo.ObjectID(userData.userId)
    req.session.shop = mongoose.mongo.ObjectID(userData.shop);
    next();
  })
}
 