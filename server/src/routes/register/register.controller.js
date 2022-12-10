const { Student } = require("../../models/student.model");

// POST -> /user/register
async function register(req, res) {
  const body = req.body;

  try {
    if (body.user === "student") {
      const isUserExists = await Student.findOne({ reg_no: body.reg_no });

      if (!isUserExists) {
        const user = await Student.create(body);

        console.log(user);
      }
    }
  } catch (err) {
    if (err) res.json({ error: "Fill all the details" });
  }
}

module.exports = { register };
