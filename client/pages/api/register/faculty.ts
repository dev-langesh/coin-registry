import { NextApiRequest, NextApiResponse } from "next";
import { facultyRecord } from "../../../server/models/record.model";
import { Faculty } from "../../../server/models/user.model";

export default async function registerStudent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;

    let user = await Faculty.findOne({ faculty_id: body.faculty_id });

    if (body.registered && !user) {
      res.json({ error: "User not found" });
    }

    if (!body.registeration && !user) {
      if (
        !body.faculty_id ||
        !body.name ||
        !body.department ||
        !body.purpose ||
        !body.out_time ||
        !body.status
      ) {
        throw new Error("fill all details");
      }

      user = await Faculty.create(body);
    }

    body.faculty_id = user._id;
    await facultyRecord.create(body);

    res.json({ message: "Faculty registered" });
  } catch (err: any) {
    res.json({ error: err.message });
  }
}
