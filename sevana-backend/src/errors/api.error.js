class ApiError extends Error {
  constructor({
    statusCode = 500,
    message = "Internal Server Error",
    errors = [],
    isOperational = true,
  }) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;