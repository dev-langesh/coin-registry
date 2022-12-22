import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../server/config/connectDb";
import { facultyRecord } from "../../server/models/record.model";
import { Faculty } from "../../server/models/user.model";

export default async function filteredFaculty(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  const faculty = await Faculty.findOne(body);

  if (!faculty) {
    return res.json({ error: "No records" });
  }

  const data = await facultyRecord.find({
    faculty_id: faculty._id,
    ...body,
  });

  return res.json(data);
}
