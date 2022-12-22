import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../../server/config/connectDb";
import { Token } from "../../../server/models/token.model";
import { randomBytes } from "crypto";
import qrcode from "qrcode";

export default async function generateCode(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectDb();

  const tokens = await Token.find({});

  let token = randomBytes(32).toString("hex");

  if (tokens.length === 0) {
    await Token.create({
      token,
    });
  } else {
    const id = tokens[0]._id;

    await Token.findByIdAndUpdate(id, { $set: { token } });
  }

  qrcode.toString(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/register/${token}`,
    { type: "svg" },
    (err, code) => {
      return res.json({ svg: code });
    }
  );
}
