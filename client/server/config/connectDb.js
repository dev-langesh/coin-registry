const mongoose = require("mongoose");
const { configEnv } = require("./envConf");

import mongoose from "";

configEnv("../../.env");

const URI = process.env.MONGO_URI;

export function connectDb() {
  mongoose.connect(URI, (err) => {
    if (err) throw new Error("db connection failed");
    else console.log("connected to db");
  });
}
