const process = require("process");
const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  port: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenExpireIn: process.env.JWT_EXPIRES_IN,
    saltRounds: process.env.BCRYPT_ROUNDS,
  },
};
