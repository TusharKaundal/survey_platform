/* eslint-disable no-unused-vars */

const { AppError } = require("../utils/AppError");
const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  logger.error("", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status || "error",
      message: err.message || "Something went wrong",
      ...(err?.details && { errors: err?.details }),
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      status: "error",
      message: "You already have a survey with this title",
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
    errors: err?.details || null,
  });
}

module.exports = errorHandler;
