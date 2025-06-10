class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    if (details) {
      this.details = details;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class ValidationError extends AppError {
  constructor(message, details) {
    super(message, 400, details);
  }
}

class AuthenticationError extends AppError {
  constructor(message, details) {
    super(message, 401, details);
  }
}

class NotFoundError extends AppError {
  constructor(message, details) {
    super(message, 404, details);
  }
}

class BadRequestError extends AppError {
  constructor(message, details) {
    super(message, 400, details);
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  AuthenticationError,
  BadRequestError,
};
