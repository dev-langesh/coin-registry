const mongoose = require("mongoose");
const { configEnv } = require("./envConf");

configEnv("../../.env");

const URI = process.env.MONGO_URI;

function connectDb() {
  mongoose.connect(URI, (err) => {
    if (err) throw new Error("db connection failed");
    else console.log("connected to db");
  });
}

module.exports = { connectDb };
