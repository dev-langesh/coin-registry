const mongoose = require("mongoose");

require("dotenv").config();

const URI = process.env.MONGO_URI;

function connectDb() {
  mongoose.connect(URI);
}

module.exports = { connectDb };
