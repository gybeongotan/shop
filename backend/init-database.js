const mongoose = require("mongoose");
const {NODE_ENV,MONGODB_URI_LOCAL,MONGODB_URI_ONLINE} = process.env
function ConnecDB() {
  return new Promise((resolve, reject) => {
    let url =  NODE_ENV === 'production' ?  MONGODB_URI_ONLINE : MONGODB_URI_LOCAL
    mongoose
      .connect(url, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        resolve('Connected to the Database');
      })
      .catch(() => {
        reject('Database connection error');
      });
  });
}


module.exports = ConnecDB