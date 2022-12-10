const { Student } = require("../../models/student.model");

// POST -> /user/register
async function register(req, res) {
  const body = req.body;

  console.log(req.body);

  try {
    if (body.user === "student") {
      const isUserExists = await Student.findOne({ reg_no: body.reg_no });

      console.log(isUserExists);
      if (!isUserExists) {
        const user = await Student.create(body);

        console.log(user);
      }
    }

    res.json({ message: "User registered" });
  } catch (err) {
    if (err) res.json({ error: "Fill all the details", err });
  }
}

module.exports = { register };
