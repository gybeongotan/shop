const express = require('express')
const App = express()
const cookieParser = require("cookie-parser")


const user = require("./routes/user")
const shop = require("./routes/shop")
const inbox = require("./routes/inbox")
const product = require("./routes/product")
const order = require("./routes/order")
const gateKeeper = require("./tools/gateKeeper")
const dataManagement = require("./tools/dataManagement") 

App.use(cookieParser())
App.use(express.json())
App.use("/", gateKeeper)
App.use("/", dataManagement)
App.use("/user", user) 
App.use("/shop", shop)
App.use("/inbox", inbox)
App.use("/product", product)
App.use("/order", order)

module.exports = App