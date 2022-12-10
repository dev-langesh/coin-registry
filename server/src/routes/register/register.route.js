const { register } = require("./register.controller");

const registerRouter = require("express").Router();

registerRouter.post("/register", register);

module.exports = { registerRouter };
