require("dotenv").config();

const express = require("express");
const App = express();
const vhost = require("vhost");
const cors = require("cors");
const sessions = require("express-session");
const https = require("https");
const http = require("http");
const fs = require("fs");
let key = fs.readFileSync(__dirname + "/certs/key.pem");
let cert = fs.readFileSync(__dirname + "/certs/cert.pem");

let options = {
  key,
  cert,
};

const frontend = require("./frontend");
const backend = require("./backend");

const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME;

App.use(
  cors({
    origin: "http://shop.localhost:3000",
    credentials: true,
  })
);
const oneDay = 1000 * 60 * 60 * 24;
App.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: oneDay,
    },
    resave: false,
  })
);
App.use("/api", backend);
App.use("/", frontend);

async function startServer() {
  let server =
    process.env.NODE_ENV === "development"
      ? https.createServer(options, App)
      : http.createServer(App);
  let [success, error] = await require("./init-database")();
  if (error) console.log(error);
  else
    server.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
}

startServer();
