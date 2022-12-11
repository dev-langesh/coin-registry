const { register } = require("./register.controller");

const registerRouter = require("express").Router();

registerRouter.get("/records");

registerRouter.post("/register", register);

module.exports = { registerRouter };
