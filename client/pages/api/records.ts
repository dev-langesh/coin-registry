import { NextApiRequest, NextApiResponse } from "next";
import { facultyRecord, studentRecord } from "../../server/models/record.model";
import { Faculty, Student } from "../../server/models/user.model";
import { calculateDate } from "../../server/utils/calcDate";

export default async function record(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const students = await Student.find({});

  const faculties = await Faculty.find({});

  const date = calculateDate();

  const studentRec = await studentRecord
    .find({ date: date.date })
    .sort({ _id: -1 });

  const facultyRec = await facultyRecord
    .find({ date: date.date })
    .sort({ _id: -1 });

  const data = {
    students,
    faculties,
    studentRec,
    facultyRec,
  };

  return res.json(data);
}
