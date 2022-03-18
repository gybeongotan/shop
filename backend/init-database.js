const mongoose = require("mongoose");
const { NODE_ENV, MONGODB_URI_LOCAL, MONGODB_URI_ONLINE } = process.env;
async function ConnecDB() {
  let url = NODE_ENV === "production" ? MONGODB_URI_ONLINE : MONGODB_URI_LOCAL;

  try {
    await mongoose.connect(url, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    return [true, false];
  } catch (error) {
    return [false, error];
  }
}

module.exports = ConnecDB;
