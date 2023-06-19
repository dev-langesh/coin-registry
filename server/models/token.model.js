import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    token: String,
  },
  { collection: "token" }
);

export const Token = mongoose.models.Token || mongoose.model("Token", schema);
