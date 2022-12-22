import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../server/config/connectDb";
import { studentRecord } from "../../server/models/record.model";
import { calculateDate } from "../../server/utils/calcDate";

export default async function getStudentRecords(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const date = calculateDate();

  const data = await studentRecord.find({ date: date.date }).sort({ _id: -1 });
  return res.json(data);
}
