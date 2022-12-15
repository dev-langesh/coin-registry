import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

export function connectDb() {
  mongoose.connect(URI, (err) => {
    if (err) throw new Error("db connection failed");
    else console.log("connected to db");
  });
}
