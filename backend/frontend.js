require('dotenv')
const express = require('express')
const App = express()
const path = require('path')
const publicPath =
  process.env.NODE_ENV == 'production' ? '/public' : '../frontend/build'
App.use(express.static(path.join(__dirname, publicPath)))
App.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, publicPath, 'index.html'))
})

module.exports = App
