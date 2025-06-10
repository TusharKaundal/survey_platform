// const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
let express = require("express");
let server = express();

server.use(app);

server.listen(config.port, () => {
  console.log(`App is running on port ${config.port}`);
});
