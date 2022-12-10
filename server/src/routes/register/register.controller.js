const { studentRecord } = require("../../models/record.model");
const { Student, Faculty } = require("../../models/student.model");
const { calculateDate } = require("../../utils/calcDate");

// POST -> /user/register
async function register(req, res) {
  const body = req.body;

  console.log(req.body);

  try {
    if (body.user === "student") {
      let user = await Student.findOne({ reg_no: body.reg_no });

      console.log(user);
      if (!user) {
        user = await Student.create(body);
      }

      const today = calculateDate();

      const rec = await studentRecord.create({
        ...body,
        ...today,
        student_id: user._id,
      });

      console.log(rec);
      res.json({ message: "User registered" });
    } else if (body.user === "faculty") {
      let user = await Faculty.findOne({});
    }
  } catch (err) {
    if (err) res.json({ error: "Fill all the details", err });
  }
}

module.exports = { register };
