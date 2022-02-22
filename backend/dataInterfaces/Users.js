const tokenSigningKey = process.env.TOKEN_SIGNING_KEY
console.log(tokenSigningKey)
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')
const Posts = require('../models/Posts')

function register(userData) {
  return new Promise((resolve, reject) => {
    userData._id = new mongoose.mongo.ObjectId()
    userData.shop = new mongoose.mongo.ObjectId()
    const user = new Users(userData)
    user
      .save()
      .then((userData) => {
        Users.buildShop(userData)
        resolve({ msg: 'User registered' })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function login({ username, password, device }) {
  return new Promise((resolve, reject) => {
    Users.findOne({ $or: [{ username }, { email: username }] }) 
      .then((userData) => {
        if (!userData) reject({ error: 'Invalid Credentials' })
        Users.comparePassword(password, userData.password, (matched) => {
          if (!matched) reject({ error: 'Invalid Credentials' })
          const accessToken = jwt.sign(
            { userId: userData._id, device, shop: userData.shop },
            tokenSigningKey,
          ) 
          let {firstname, lastname,contact,address,profileIMG}  = userData;
          userData = {firstname, lastname,contact,address,profileIMG} 
          resolve({ accessToken , userData})
        })
      })
      .catch(reject)
  })
}

function getInfo(_id) {
  return new Promise((resolve, reject) => {
    Users.findById(_id, {
      _id: 0,
      __v: 0,
      password: 0,
      inbox: 0,
      post: 0,
    })
      .populate('shop')
      .lean()
      .then((userData) => {
        if (!userData) reject({ error: 'User not found' })
        userData.fullname = userData.firstname + ' ' + userData.lastname
        resolve(userData)
      })
      .catch(reject)
  })
}

function updateInfo({ _id, data }) {
  return new Promise((resolve, reject) => {
    Users.updateOne({ _id }, data).then(resolve).catch(reject)
  })
}

function getFeed(_id) {
  return new Promise((resolve, reject) => {
    Users.findById(_id, 'followed_shops')
      .populate({
        path: 'followed_shops',
        select: { posts: { $slice: -1 }, _id: 1 },
        populate: 'posts',
      })
      .then(resolve)
      .catch(reject)
  })
}

module.exports = {
  register,
  login,
  getInfo,
  updateInfo,
  getInfo,
  getFeed,
}
