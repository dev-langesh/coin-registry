const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    reg_no: { type: String, required: true, unique: true },
    name: { type: String },
    department: String,
    year: String,
  },
  {
    collection: "students",
  }
);

const facultySchema = mongoose.Schema(
  {
    faculty_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: String,
  },
  {
    collection: "faculties",
  }
);

export const Student = mongoose.model("student", studentSchema);
export const Faculty = mongoose.model("faculty", facultySchema);

// module.exports = { Student, Faculty };
