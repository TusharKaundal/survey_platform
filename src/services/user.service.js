const User = require("../models/user.model");
const { BadRequestError } = require("../utils/AppError");

/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return await User.findById(id);
};

/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

/**
 * Create a user
 *  - checking if the user with the email already exists using `User.emailTaken()` method
 *  - If so throw an error using the custom error class `AppError` class.
 *    1. '400 Bad Request'
 *    2. An error message, 'Email already taken'
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {BadRequestError}
 */
const createUser = async (userData) => {
  const emailTaken = await User.emailTaken(userData.email);
  if (emailTaken) {
    throw new BadRequestError("Email already taken", {
      email: ["This email is already taken"],
    });
  }
  const newUser = await User.create(userData);
  return newUser;
};

module.exports = { getUserById, getUserByEmail, createUser };
