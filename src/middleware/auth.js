const jwt = require("jsonwebtoken");
const { AuthenticationError, AppError } = require("../utils/AppError");
const config = require("../config/config");

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthenticationError("Token missing or malformed");
  }
  const token = authHeader && authHeader.split(" ")[1]; //Bearer token
  if (!token) {
    throw new AuthenticationError("Token not provided");
  }
  try {
    const user = jwt.verify(token, config.jwt.secret);
    req.user = user;
    next();
  } catch (error) {
    throw new AppError("Invalid or expired token", 403, error);
  }
};

module.exports = { auth };
