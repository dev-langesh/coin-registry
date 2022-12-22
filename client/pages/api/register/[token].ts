import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../../server/config/connectDb";
import { Token } from "../../../server/models/token.model";

export default async function verifyToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectDb();

  const token = await Token.findOne({ token: req.query.token });

  if (token) {
    return res.json({ message: "Token is valid" });
  }
  return res.json({ error: "Invalid token" });
}
