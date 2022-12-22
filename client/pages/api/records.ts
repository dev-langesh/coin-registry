import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../server/config/connectDb";
import { facultyRecord, studentRecord } from "../../server/models/record.model";
import { Faculty, Student } from "../../server/models/user.model";
import { format } from "date-fns";

export default async function record(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  connectDb();

  const date = format(new Date(), "dd-MM-yyyy");

  const students = await Student.find({});

  const faculties = await Faculty.find({});

  const studentRec = await studentRecord.find({ date }).sort({ _id: -1 });

  const facultyRec = await facultyRecord.find({ date }).sort({ _id: -1 });

  const data = {
    students,
    faculties,
    studentRec,
    facultyRec,
  };

  return res.json(data);
}
