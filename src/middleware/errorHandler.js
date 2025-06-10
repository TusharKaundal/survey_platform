/* eslint-disable no-unused-vars */
const { AppError } = require("../utils/AppError");
const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  // Format error for logging
  const errorLog = {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode || 500,
    details: err.details,
    path: req.originalUrl,
    method: req.method,
  };

  // Log the formatted error
  logger.error(errorLog);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status || "error",
      message: err.message || "Something went wrong",
      details: err?.details || null,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
    details: err?.details || null,
  });
}

module.exports = errorHandler;
