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
  mongoose.models.studentRecord ||
  mongoose.model("studentRecord", studentRecordSchema);
const facultyRecord =
  mongoose.models.facultyRecord ||
  mongoose.model("facultyRecord", facultyRecordSchema);

module.exports = { studentRecord, facultyRecord };
