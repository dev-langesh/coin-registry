const { studentRecord, facultyRecord } = require("../../models/record.model");
const { Student, Faculty } = require("../../models/user.model");
const { calculateDate } = require("../../utils/calcDate");

// GET -> /records/registered-students
async function registeredStudents(req, res) {
  const data = await Student.find({});

  return res.json(data);
}

// GET -> /records/registered-faculties
async function registeredFaculties(req, res) {
  const data = await Faculty.find({});

  return res.json(data);
}

// GET -> /records/students
async function getStudentRecords(req, res) {
  const date = calculateDate();

  const data = await studentRecord.find({ date: date.date });
  return res.json(data.reverse());
}

// GET -> /records/faculties
async function getFacultyRecords(req, res) {
  const date = calculateDate();

  const data = await facultyRecord.find({ date: date.date });

  return res.json(data);
}

module.exports = {
  getStudentRecords,
  getFacultyRecords,
  registeredStudents,
  registeredFaculties,
};
