import { NextApiRequest, NextApiResponse } from "next";
import { studentRecord } from "../../../server/models/record.model";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { from, to } = req.body;

  const date = {
    $gte: new Date(from),
    $lte: new Date(to),
  };

  return studentRecord.aggregate([
    {
      $match: {
        date: {
          $gte: "20-06-2023",
          $lte: "23-06-2023",
        },
      },
    },
  ]);
}
