const { ZodError } = require("zod");
const ApiError = require("../errors/api.error");

function errorHandler(err, req, res, next) {
  console.error(err);

  // Zod Validation Error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Custom API Error
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
    });
  }

  // PostgreSQL Unique Constraint
  if (err.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "Duplicate value.",
      errors: [],
    });
  }

  // JWT Errors
  if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
      errors: [],
    });
  }

  // Unknown Error
  return res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
    errors:
      process.env.NODE_ENV === "production"
        ? []
        : [err.stack],
  });
}

module.exports = errorHandler;