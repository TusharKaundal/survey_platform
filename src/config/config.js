const process = require("process");
const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  port: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URL,
  },
  access_token: process.env.JWT_SECRET,
  refresh_token: process.env.JWT_REFRESH_SECRET,
};
