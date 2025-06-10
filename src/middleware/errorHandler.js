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
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
    errors: err?.details || null,
  });
}

module.exports = errorHandler;
