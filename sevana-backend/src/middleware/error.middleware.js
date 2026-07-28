const { ZodError } = require("zod");
const ApiError = require("../errors/api.error");
const { fail } = require("../shared/response");

function errorHandler(err, req, res, next) {
  console.error(err);

  // Zod Validation Error
  if (err instanceof ZodError) {
    return fail(res, { statusCode: 400, message: "Validation failed." });
  }

  // Custom API Error
  if (err instanceof ApiError) {
    return fail(res, { statusCode: err.statusCode, message: err.message });
  }

  // PostgreSQL Unique Constraint
  if (err.code === "23505") {
    return fail(res, { statusCode: 409, message: "Duplicate value." });
  }

  // JWT Errors
  if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    return fail(res, { statusCode: 401, message: "Invalid or expired token." });
  }

  // Unknown Error
  return fail(res, {
    statusCode: 500,
    message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message,
  });
}

module.exports = errorHandler;
