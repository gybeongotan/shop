
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI_LOCAL, {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Connected to the Database'))
    .catch(() => console.log('Database connection problem'));
    

