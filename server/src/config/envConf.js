const path = require("path");
const { config } = require("dotenv");

function configEnv(p) {
  return config({
    path: path.resolve(__dirname, p),
  });
}

module.exports = { configEnv };
