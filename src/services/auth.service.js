const userService = require("./user.service");
const { BadRequestError } = require("../utils/AppError");

const loginWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid credentials");
  }
  return user;
};

module.exports = { loginWithEmailAndPassword };
