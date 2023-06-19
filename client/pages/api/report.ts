import { NextApiRequest, NextApiResponse } from "next";
import { Faculty, Student } from "../../server/models/user.model";
import { facultyRecord, studentRecord } from "../../server/models/record.model";
import { connectDb } from "../../server/config/connectDb";
import { format } from "date-fns";
import xl from "excel4node";
import fs from "fs";
import path from "path";

export default async function report(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  connectDb();

  const date = format(new Date(), "dd-MM-yyyy");

  const students = await Student.find({}).lean();

  const faculties = await Faculty.find({}).lean();

  const studentRec = await studentRecord
    .find({ date })
    .sort({ _id: -1 })
    .lean();

  const facultyRec = await facultyRecord
    .find({ date })
    .sort({ _id: -1 })
    .lean();

  const studentData = studentRec.map((sr) => {
    const student = students.find((s) => s._id.equals(sr.student_id));
    return {
      ...student,
      ...sr,
    };
  });

  const facultyData = facultyRec.map((fr) => {
    const faculty = faculties.find((f) => f._id.equals(fr.faculty_id));
    return {
      ...faculty,
      ...fr,
    };
  });

  const data = [...studentData, ...facultyData];

  var wb = new xl.Workbook();

  // Add Worksheets to the workbook
  var ws = wb.addWorksheet("Sheet 1");

  // Create a reusable style
  var style = wb.createStyle({
    font: {
      color: "#FF0800",
      size: 12,
    },
    numberFormat: "$#,##0.00; ($#,##0.00); -",
  });

  const columns = [
    "Roll No",
    "Name",
    "Department",
    "Year",
    "Date",
    "In time",
    "Out time",
    "Purpose",
    "Status",
  ];

  columns.forEach((val, i) => {
    ws.cell(1, i + 1)
      .string(val)
      .style(style);
  });

  data.forEach((rec, r_no) => {
    const col = [];
    col.push(
      rec.reg_no,
      rec.name,
      rec.department,
      rec.year,
      rec.date,
      rec.in_time,
      rec.out_time,
      rec.purpose,
      rec.status
    );

    let c_no = 1;

    col.forEach((val) => {
      if (typeof val === "number") {
        ws.cell(r_no + 2, c_no).number(val);
      } else {
        ws.cell(r_no + 2, c_no).string(val);
      }
      c_no++;
    });
  });

  const filePath = path.join(
    process.cwd(),
    "public",
    "reports",
    `${date}.xlsx`
  );

  const isExists = fs.existsSync(filePath);

  if (isExists) {
    fs.rmSync(filePath);
  }

  await new Promise((resolve, reject) => {
    wb.write(filePath, (err: any, stats: any) => {
      if (err) {
        reject(err);
      } else {
        resolve("");
      }
    });
  });

  // Set the response headers to trigger a file download
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(`Content-Disposition`, `attachment; filename=${date}.xlsx`);

  // Read the file and send it in the response
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
}
