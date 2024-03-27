const { MongoClient, CURSOR_FLAGS } = require("mongodb");
const { format } = require("date-fns");

async function getRecord(req, res) {
  const url = process.env.MONGO_URI; // Replace with your MongoDB connection URL
  const dbName = "coin-registry"; // Replace with your database name

  const client = new MongoClient(url);

  const { from, to } = req.body;

  try {
    await client.connect();

    const date = format(new Date(), "dd-MM-yyyy");

    const db = client.db(dbName);

    const students = db.collection("students");
    const faculties = db.collection("faculties");
    const studentRec = db.collection("student-record");
    const facultyRec = db.collection("faculty-record");

    const studentsData = await students.find().toArray();
    const facultiesData = await faculties.find().toArray();

    
    let query = { date: { $gte: new Date(from), $lte: new Date(to) } };

    if(from == to){
      query = {date : new Date(from)}
    }

    console.log(query)
    
    
    const studentRecData = await studentRec.find(query).toArray();
    
    // console.log(studentRecData)

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

    console.log(data);

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
        studentCount[department.trim()] = 0;
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

    res.json({ record: data, studentCount, maxUsed, maxRecordCount });
  } catch (e) {
    res.json({ e: e.message });
  }
}

module.exports = { getRecord };
