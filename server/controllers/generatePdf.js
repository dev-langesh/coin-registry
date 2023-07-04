const { MongoClient, CURSOR_FLAGS } = require("mongodb");
const { format } = require("date-fns");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");

async function generatePDF(req, res) {
  const url = process.env.MONGO_URI; // Replace with your MongoDB connection URL
  const dbName = "registry"; // Replace with your database name

  const client = new MongoClient(url);

  const { from, to } = req.body;

  try {
    await client.connect();

    const db = client.db(dbName);

    const students = db.collection("students");
    const faculties = db.collection("faculties");
    const studentRec = db.collection("student-record");
    const facultyRec = db.collection("faculty-record");

    const studentsData = await students.find().toArray();
    const facultiesData = await faculties.find().toArray();

    let query = { date: { $gte: new Date(from), $lte: new Date(to) } };

    if (from == to) {
      query = { date: new Date(from) };
    }

    // console.log(query);

    const studentRecData = await studentRec.find(query).toArray();

    // console.log(studentRecData);

    const facultyRecData = await facultyRec.find(query).toArray();

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

    // console.log(data);

    const studentCount = {
      CSE: 0,
      IT: 0,
      AIDS: 0,
      ECE: 0,
      EEE: 0,
      MECH: 0,
      MTECH: 0,
      BME: 0,
      CIVIL: 0,
      EIE: 0,
      RA: 0,
    };

    data.forEach((rec) => {
      const department = rec.department.toUpperCase();

      if (!studentCount[department.trim()]) {
        studentCount[department.trim()] = 1;
      }

      studentCount[department.trim()] += 1;
    });

    const recordCounts = {};

    data.forEach((record) => {
      const regNo = record.reg_no;
      if (recordCounts.hasOwnProperty(regNo)) {
        recordCounts[regNo]++;
      } else {
        recordCounts[regNo] = 1;
      }
    });

    let maxRecordCount = 0;
    let recordWithMaxCount = null;

    for (const regNo in recordCounts) {
      if (recordCounts[regNo] > maxRecordCount) {
        maxRecordCount = recordCounts[regNo];
        recordWithMaxCount = regNo;
      }
    }

    const maxUsed = data.find((s) => s.reg_no === recordWithMaxCount);

    // Create a new PDF document
    const doc = await PDFDocument.create();
    const page = doc.addPage();

    // Set document properties
    doc.setTitle("Student Entries");

    // Set fonts
    const font = await doc.embedFont(StandardFonts.Helvetica);

    // Set initial table position and dimensions
    const tableTop = 700;
    const cellPadding = 5;
    const columnWidth = 60;
    const rowHeight = 20;
    const rowSpacing = 10;

    // Add table headers
    const headers = [
      "Registration No",
      "Name",
      "Department",
      "Year",
      "Date",
      "In Time",
      "Out Time",
      "Purpose",
      "Status",
    ];
    headers.forEach((header, index) => {
      const headerX =
        50 +
        index * columnWidth +
        (columnWidth - font.widthOfTextAtSize(header, 12)) / 2;
      page.drawText(header, {
        x: headerX,
        y: tableTop,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
    });

    // Add table rows
    let currentRow = 0;
    data.forEach((entry) => {
      const rowY = tableTop - (currentRow + 1) * (rowHeight + rowSpacing);

      const row = [
        entry.reg_no,
        entry.name,
        entry.department,
        String(entry.year).split("\n").join(" "),
        String(entry.date).split("\n").join(" "),
        String(entry.in_time).split("\n").join(" "),
        String(entry.out_time).split("\n").join(" "),
        String(entry.purpose).split("\n").join(" "),
        String(entry.status).split("\n").join(" "),
      ];

      row.forEach((cell, index) => {
        const text = String(cell);
        const textWidth = estimateTextWidth(text, font, 10);
        const cellWidth = Math.min(textWidth + cellPadding * 2, columnWidth);

        const cellX = 50 + index * columnWidth + (columnWidth - cellWidth) / 2;
        const cellY = rowY + rowHeight / 2 - 5;

        const availableSpace =
          rowY - (tableTop - (currentRow + 2) * (rowHeight + rowSpacing));
        const maxTextHeight = Math.floor(availableSpace - cellPadding * 2);

        let lines = [];
        let currentText = text;

        while (currentText.length > 0) {
          const currentIndex = Math.floor(
            ((cellWidth - cellPadding * 2) * currentText.length) / textWidth
          );
          const line = currentText.slice(0, currentIndex);
          lines.push(line);
          currentText = currentText.slice(currentIndex);
        }

        lines.forEach((line, lineIndex) => {
          const lineY = cellY - lineIndex * (font.heightAtSize(10) + 2);

          page.drawText(line, {
            x: cellX,
            y: lineY,
            size: 10,
            font,
            color: rgb(0, 0, 0),
          });
        });
      });

      currentRow++;
    });

    // Finalize the PDF and save it to a file
    const pdfBytes = await doc.save();
    fs.writeFileSync("student-entries.pdf", pdfBytes);

    res.json({ record: data, studentCount, maxUsed, maxRecordCount });
  } catch (e) {
    res.json({ e: e.message });
  }
}

function estimateTextWidth(text, font, fontSize) {
  const averageCharWidth =
    font.widthOfTextAtSize(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      fontSize
    ) / 62;
  return averageCharWidth * text.length;
}

module.exports = { generatePDF };
