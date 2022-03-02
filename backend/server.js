require("dotenv").config();

const express = require("express");
const App = express();
const vhost = require("vhost");
const cors = require("cors");

const https = require('https');
const fs = require('fs'); 
let key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
let cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');

 
let options = {
  key,
  cert
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

App.use(vhost (HOSTNAME, frontend));
App.use(vhost(`api.${HOSTNAME}`, backend));


let server = https.createServer(options, App);

require("./init-database")()
  .then((msg) => { 
    console.log(msg);
    server.listen(PORT, () => {
      console.log("Server is listening on port " + PORT);
    });
  })
  .catch(console.log);
