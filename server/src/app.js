const express = require("express");
const { registerRouter } = require("./routes/register/register.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/user/", registerRouter);

app.get("/", (req, res) => {
  res.send("server is running");
});

module.exports = { app };
