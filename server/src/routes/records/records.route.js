const {
  getStudentRecords,
  getFacultyRecords,
  registeredStudents,
  registeredFaculties,
} = require("./records.controller");

const router = require("express").Router();

router.get("/students", getStudentRecords);
router.get("/faculties", getFacultyRecords);
router.get("/registered-students/", registeredStudents);
router.get("/registered-faculties/", registeredFaculties);

module.exports = { recordRouter: router };
