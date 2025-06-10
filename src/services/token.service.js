const jwt = require("jsonwebtoken");
const config = require("../config/config");

/**
 * Generate jwt token
 * - Payload should have userId, email,iat,exp
 * - Return token
 *
 * - token expiration must be set to the given expires
 *
 * @param {ObjectId} userId
 * @param {string} email
 * @param {number} expires
 * @param {string} secret
 * @returns {string}
 */
const generateToken = (userId, email) => {
  const payload = {
    user_id: userId,
    email: email,
    iat: Math.floor(Date.now() / 1000),
  };
  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.tokenExpireIn,
  });
  return token;
};

/**
 * Generate auth token
 * - Generate jwt token
 * - Return token
 *
 * @param {User} user
 * @returns {Promise<Object>}
 *
 * Example response:
 * {
 *          "token": "eyJhbGciOiJIUzI1NiIs...",
 * }
 */
const generateAuthTokens = async (userId, email) => {
  const accessToken = generateToken(userId, email);
  return { token: accessToken };
};

module.exports = { generateAuthTokens, generateToken };
