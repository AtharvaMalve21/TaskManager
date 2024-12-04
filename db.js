const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`Connection with DB successfull.`);
    })
    .catch((err) => {
      console.log("Connection with DB failed");
      console.error(err);
      process.exit(1);
    });
};

module.exports = connectDB ;