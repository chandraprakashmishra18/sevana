const { ZodError } = require("zod");
const ApiError = require("../errors/api.error");
const { fail } = require("../shared/response");

const POSTGRES_ERRORS = {
  "23502": { statusCode: 400, message: "A required field is missing." },
  "23503": { statusCode: 400, message: "A referenced resource does not exist." },
  "23505": { statusCode: 409, message: "A record with this value already exists." },
  "23514": { statusCode: 400, message: "One or more values are invalid." },
  "22001": { statusCode: 400, message: "One or more values are too long." },
  "22P02": { statusCode: 400, message: "One or more values have an invalid format." },
};

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  // Zod Validation Error
  if (err instanceof ZodError) {
    return fail(res, { statusCode: 400, message: "Validation failed." });
  }

  // Custom API Error
  if (err instanceof ApiError) {
    return fail(res, { statusCode: err.statusCode, message: err.message });
  }

  // PostgreSQL constraint and data-format errors
  if (POSTGRES_ERRORS[err.code]) {
    return fail(res, POSTGRES_ERRORS[err.code]);
  }

  if (err.name === "MulterError") {
    const message = err.code === "LIMIT_FILE_SIZE"
      ? "File must be 8 MB or smaller."
      : "Invalid file upload.";
    return fail(res, { statusCode: 400, message });
  }

  // JWT errors
  if (["JsonWebTokenError", "TokenExpiredError", "NotBeforeError"].includes(err.name)) {
    return fail(res, { statusCode: 401, message: "Invalid or expired token." });
  }

  // Unknown Error
  return fail(res, {
    statusCode: 500,
    message: "Internal Server Error.",
  });
}

module.exports = errorHandler;
