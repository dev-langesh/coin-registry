import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../server/config/connectDb";
import { studentRecord } from "../../server/models/record.model";
import { Student } from "../../server/models/user.model";

export default async function filteredStudent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectDb();

  const body = req.body;

  const student = await Student.findOne(body);

  if (!student) {
    return res.json({ error: "No records" });
  }

  const data = await studentRecord.find({
    student_id: student._id,
    ...body,
  });

  return res.json(data);
}
