const { studentRecord, facultyRecord } = require("../../models/record.model");
const { Student, Faculty } = require("../../models/user.model");
const { calculateDate } = require("../../utils/calcDate");

// POST -> /user/register
async function register(req, res) {
  const body = req.body;

  try {
    if (body.user === "student") {
      let user = await Student.findOne({ reg_no: body.reg_no });

      if (!user) {
        if (!body.name || !body.department || !body.year) {
          throw new Error("fill all details");
        }

        if (body.reg_no.length != 7) {
          console.log("inv roll");
          return res.json({ error: "Invalid reg no" });
        }
        user = await Student.create(body);
      }

      const today = calculateDate();

      const rec = await studentRecord.create({
        ...body,
        ...today,
        student_id: user._id,
      });

      // console.log(rec);

      res.json({ message: "Student registered" });
    }

    // faculty registeration
    else if (body.user === "faculty") {
      let user = await Faculty.findOne({ faculty_id: body.faculty_id });

      if (!user) {
        if (!body.name || !body.department) {
          throw new Error();
        }
        user = await Faculty.create(body);
      }

      const today = calculateDate();

      const rec = await facultyRecord.create({
        ...body,
        ...today,
        faculty_id: user._id,
      });

      // console.log(rec);
      res.json({ message: "Faculty registered" });
    } else {
      throw new Error("fill all detaiils");
    }
  } catch (err) {
    console.log(err);
    if (err) res.json({ error: "Fill all the details" });
  }
}

module.exports = { register };
