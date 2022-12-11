const { studentRecord, facultyRecord } = require("../../models/record.model");
const { Student, Faculty } = require("../../models/user.model");

// GET -> /records/registered-students
async function registeredStudents(req, res) {
  const data = await Student.find({});

  return res.json(data);
}

// GET -> /records/registered-faculties
async function registeredStudents(req, res) {
  const data = await Faculty.find({});

  return res.json(data);
}

// GET -> /records/students
async function getStudentRecords(req, res) {
  const data = await studentRecord.find({});
  return res.json(data);
}

// GET -> /records/faculties
async function getFacultyRecords(req, res) {
  const data = await facultyRecord.find({});

  return res.json(data);
}

module.exports = { getStudentRecords, getFacultyRecords };
