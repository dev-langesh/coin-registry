import type { NextApiRequest, NextApiResponse } from "next";
import { Faculty, Student } from "../../server/models/user.model";
import { facultyRecord, studentRecord } from "../../server/models/record.model";
import { calculateDate } from "../../server/utils/calcDate";
import { connectDb } from "../../server/config/connectDb";

type Data = {
  error?: String;
  message?: String;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    const body = req.body;

    try {
      if (body.user === "student") {
        let user = await Student.findOne({ reg_no: body.reg_no });

        if (!user) {
          if (!body.name || !body.department || !body.year) {
            throw new Error("fill all details");
          }

          if (body.reg_no.length < 7) {
            return res.json({ error: "Invalid reg no" });
          }

          body.department = body.department.toUpperCase();

          user = await Student.create(body);
        }

        const today = calculateDate();

        if (!body.purpose && !body.out_time) {
          if (!body.status) {
            throw new Error("fill all details");
          } else {
            // finding last record

            const rec = await studentRecord
              .find({ student_id: user._id })
              .sort({ _id: -1 })
              .limit(1);

            console.log(rec);

            const updated = await studentRecord.findByIdAndUpdate(rec[0]._id, {
              $set: { status: body.status },
            });

            console.log(updated);

            return res.json({ message: "Status updated" });
          }
        } else if (!body.status) {
          throw new Error("fill all the details");
        } else {
          const rec = await studentRecord.create({
            ...body,
            ...today,
            student_id: user._id,
          });
        }

        // console.log(rec);

        res.json({ message: "Student registered" });
      }

      // faculty registeration
      else if (body.user === "faculty") {
        let user = await Faculty.findOne({ faculty_id: body.faculty_id });

        if (!user) {
          if (!body.name || !body.department) {
            throw new Error();
          }

          body.department = body.department.toUpperCase();

          user = await Faculty.create(body);
        }

        const today = calculateDate();

        if (!body.purpose && !body.out_time) {
          if (!body.status) {
            throw new Error("fill all details");
          } else {
            // finding last record

            const rec = await facultyRecord
              .find({ faculty_id: user._id })
              .sort({ _id: -1 })
              .limit(1);

            console.log(rec);

            const updated = await facultyRecord.findByIdAndUpdate(rec[0]._id, {
              $set: { status: body.status },
            });

            console.log(updated);

            return res.json({ message: "Status updated" });
          }
        } else if (!body.status) {
          throw new Error("fill all the details");
        } else {
          const rec = await facultyRecord.create({
            ...body,
            ...today,
            faculty_id: user._id,
          });
          res.json({ message: "Faculty registered" });
        }
      } else {
        throw new Error("fill all detaiils");
      }
    } catch (err) {
      console.log(err);
      if (err) res.json({ error: "Fill all the details" });
    }
  }
}
