const {
  getStudentRecords,
  getFacultyRecords,
} = require("./records.controller");

const recordRouter = require("express").Router();

recordRouter.get("/students", getStudentRecords);
recordRouter.get("/faculties", getFacultyRecords);

module.exports = { recordRouter };
