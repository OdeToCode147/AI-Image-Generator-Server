const mongoose = require("mongoose");

const connectdb = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB Connection Successful");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectdb;
