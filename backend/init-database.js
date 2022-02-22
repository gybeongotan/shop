const mongoose = require("mongoose");

function ConnecDB() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGODB_URI_ONLINE, {
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