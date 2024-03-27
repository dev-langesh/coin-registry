const { MongoClient } = require("mongodb");
const { format } = require("date-fns");
const xl = require("excel4node");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

async function generateReport(req, res) {
  const url = process.env.MONGO_URI; // Replace with your MongoDB connection URL
  const dbName = "coin-registry"; // Replace with your database name

  const client = new MongoClient(url);

  const { from, to } = req.query;

  console.log(from, to);

  try {
    await client.connect();

    const db = client.db(dbName);

    const students = db.collection("students");
    const faculties = db.collection("faculties");
    const studentRec = db.collection("student-record");
    const facultyRec = db.collection("faculty-record");

    const studentsData = await students.find().toArray();
    const facultiesData = await faculties.find().toArray();

    const query = { date: { $gte: new Date(from), $lte: new Date(to) } };

    console.log(query);

    const studentRecData = await studentRec.find(query).toArray();

    const facultyRecData = await facultyRec.find(query).toArray();

    console.log(studentRecData,facultyRecData);

    const studentData = studentRecData.map((sr) => {
      const student = studentsData.find((s) => s._id.equals(sr.student_id));
      return {
        ...student,
        ...sr,
      };
    });

    const facultyData = facultyRecData.map((fr) => {
      const faculty = facultiesData.find((f) => f._id.equals(fr.faculty_id));
      return {
        ...faculty,
        ...fr,
      };
    });

    const data = [...studentData, ...facultyData];

    console.log(data);

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
      const date = format(rec.date, "dd-MM-yyyy");
      const col = [];
      col.push(
        rec.reg_no,
        rec.name,
        rec.department,
        rec.year,
        date,
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

    const filePath = path.join(__dirname, `report.xlsx`);

    const isExists = fs.existsSync(filePath);

    if (isExists) {
      fs.rmSync(filePath);
    }

    await new Promise((resolve, reject) => {
      wb.write(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Set the response headers to trigger a file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename=report.xlsx`);

    // Read the file and send it in the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
}

module.exports = { generateReport };
