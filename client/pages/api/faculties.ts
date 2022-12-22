import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../server/config/connectDb";
import { facultyRecord } from "../../server/models/record.model";
import { calculateDate } from "../../server/utils/calcDate";

export default async function getFacultyRecords(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectDb();

  const date = calculateDate();

  const data = await facultyRecord.find({ date: date.date }).sort({ _id: -1 });

  return res.json(data);
}
