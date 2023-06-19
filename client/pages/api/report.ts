import { NextApiRequest, NextApiResponse } from "next";
import { Faculty, Student } from "../../server/models/user.model";
import { facultyRecord, studentRecord } from "../../server/models/record.model";
import { connectDb } from "../../server/config/connectDb";
import { format } from "date-fns";

export default async function report(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  connectDb();

  const date = format(new Date(), "dd-MM-yyyy");

  const students = await Student.find({});

  const faculties = await Faculty.find({});

  const studentRec = await studentRecord.find({ date }).sort({ _id: -1 });

  const facultyRec = await facultyRecord.find({ date }).sort({ _id: -1 });

  const studentData = studentRec.map((sr) => {
    const student = students.find((s) => s._id === sr.student_id);

    console.log(student);

    return {
      ...student,
      ...sr,
    };
  });

  const data = {
    studentData,
    // faculties,
    // studentRec,
    // facultyRec,
  };

  console.log(data);

  res.json(data);
}
