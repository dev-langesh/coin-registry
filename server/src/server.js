const http = require("http");
const { app } = require("./app");
const { connectDb } = require("./config/connectDb");
const { configEnv } = require("./config/envConf");

configEnv("../../.env");

const PORT = process.env.PORT || 9000;

connectDb();

const server = http.createServer(app);

server.listen(PORT, () => console.log(`server is ready at ${PORT}`));
