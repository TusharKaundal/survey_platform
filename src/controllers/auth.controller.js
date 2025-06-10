const { catchAsync } = require("../utils/catchAsync");
const userService = require("../services/user.service");
const tokenService = require("../services/token.service");
const authService = require("../services/auth.service");

const register = catchAsync(async (req, res) => {
  const registerUser = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(
    registerUser._id,
    registerUser.email
  );
  const response = {
    success: true,
    message: "User registered successfully",
    data: {
      user: registerUser,
      ...tokens,
    },
  };
  res.status(201).json(response);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const loggedUser = await authService.loginWithEmailAndPassword(
    email,
    password
  );
  const tokens = await tokenService.generateAuthTokens(
    loggedUser._id,
    loggedUser.email
  );
  const response = {
    success: true,
    message: "Login successfully",
    data: {
      user: loggedUser,
      ...tokens,
    },
  };
  res.status(200).json(response);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.user_id);
  res.status(200).json(user);
});

module.exports = { register, login, getUser };
