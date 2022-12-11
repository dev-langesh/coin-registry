const {
  getStudentRecords,
  getFacultyRecords,
  registeredStudents,
  registeredFaculties,
  filteredStudent,
  filteredFaculty,
} = require("./records.controller");

const router = require("express").Router();

router.get("/students", getStudentRecords);
router.get("/faculties", getFacultyRecords);
router.get("/registered-students/", registeredStudents);
router.get("/registered-faculties/", registeredFaculties);
router.post("/filter-student", filteredStudent);
router.post("/filter-faculty", filteredFaculty);

module.exports = { recordRouter: router };
