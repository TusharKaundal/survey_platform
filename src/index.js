const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
let express = require("express");
let server = express();

server.use(app);

mongoose.connect(config.mongoose.url).then(() => {
  console.log("Connected to MongoDB");
  server.listen(config.port, () => {
    console.log(`App is running on port ${config.port}`);
  });
});
