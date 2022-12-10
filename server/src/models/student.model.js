const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  reg_no: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: String,
  year: Number,
});

const Student = mongoose.model("student", studentSchema);

module.exports = { Student };
