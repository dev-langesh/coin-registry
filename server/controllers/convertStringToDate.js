const { MongoClient } = require("mongodb");
const { format } = require("date-fns");

async function getRecord(req, res) {
  const url = process.env.MONGO_URI; // Replace with your MongoDB connection URL
  const dbName = "coin"; // Replace with your database name

  const dest = "registry";

  const client = new MongoClient(url);

  try {
    await client.connect();

    const date = format(new Date(), "dd-MM-yyyy");

    const db = client.db(dbName);

    const students = db.collection("students");
    // const faculties = db.collection("faculties");
    const studentRec = db.collection("student-record");
    // const facultyRec = db.collection("faculty-record");

    const studentsData = await students.find().toArray();
    // const facultiesData = await faculties.find().toArray();

    const studentResData = await studentRec.find().toArray();
    // const facultyResData = await facultyRec.find().toArray();

    const updated = studentResData.map((rec) => {
      const dateString = rec.date;
      const parts = dateString.split("-"); // Split the string into day, month, and year parts
      const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`; // Rearrange the parts in the desired format
      const date = new Date(formattedDate); // Parse the formatted date string

      return { ...rec, date };
    });

    const destDb = client.db(dest);

    const str = destDb.collection("student-record");

    str.insertMany(updated);

    // console.log(studentResData);

    return res.json({ updated });
  } catch (e) {
    console.log(e);
    return res.json(e);
  }
}

module.exports = { convert: getRecord };
