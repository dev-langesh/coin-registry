const express = require("express");
const { registerRouter } = require("./routes/register/register.route");
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions");

const app = express();

// configure cors
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/user/", registerRouter);

app.get("/", (req, res) => {
  res.send("server is running");
});

module.exports = { app };
