require('dotenv').config()
require('./init-database')

const express = require('express')
const App = express()
const vhost = require('vhost')
const cors = require('cors')

const frontend = require('./frontend')
const backend = require('./backend')

const PORT = process.env.PORT || 4000
const HOSTNAME = process.env.HOSTNAME

App.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)

App.use(vhost(HOSTNAME, frontend))
App.use(vhost(`api.${HOSTNAME}`, backend))

App.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT)
})
