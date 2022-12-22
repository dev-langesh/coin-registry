const mongoose = require("mongoose");

const studentRecordSchema = mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    purpose: { type: String },
    in_time: String,
    out_time: { type: String },
    date: String,
    status: String,
  },
  {
    collection: "student record",
  }
);

const facultyRecordSchema = mongoose.Schema(
  {
    faculty_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "faculty",
      required: true,
    },
    purpose: { type: String },
    in_time: String,
    out_time: { type: String },
    date: String,
    status: String,
  },
  {
    collection: "faculty record",
  }
);

const studentRecord =
  mongoose.models["student-record"] ||
  mongoose.model("student-record", studentRecordSchema);
const facultyRecord =
  mongoose.models["faculty-record"] ||
  mongoose.model("faculty-record", facultyRecordSchema);

module.exports = { studentRecord, facultyRecord };
