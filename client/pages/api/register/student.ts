import { NextApiRequest, NextApiResponse } from "next";
import { studentRecord } from "../../../server/models/record.model";
import { Student } from "../../../server/models/user.model";

export default async function registerStudent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;

    req.body.date = new Date();

    let user = await Student.findOne({ reg_no: body.reg_no });

    if (body.registered && !user) {
      res.json({ error: "User not found" });
    }

    if (!body.registeration && !user) {
      if (
        !body.reg_no ||
        !body.name ||
        !body.department ||
        !body.year ||
        !body.purpose ||
        !body.out_time ||
        !body.status
      ) {
        throw new Error("fill all details");
      }

      if (body.reg_no.length < 7) {
        return res.json({ error: "Invalid reg no" });
      }

      user = await Student.create(body);
    }

    body.student_id = user._id;
    const a = await studentRecord.create(body);

    console.log(a);
    res.json({ message: "Student registered" });
  } catch (err: any) {
    res.json({ error: err.message });
  }
}
