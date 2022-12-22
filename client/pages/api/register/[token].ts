import { NextApiRequest, NextApiResponse } from "next";

export default function verifyToken(req: NextApiRequest, res: NextApiResponse) {
  res.json({ id: req.query });
}
