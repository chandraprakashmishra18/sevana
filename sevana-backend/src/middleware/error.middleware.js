const ApiError = require("../errors/api.error");

const errorHandler = (err, req, res, next) => {
  // Log unexpected errors (replace with a logger later)
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
    errors: process.env.NODE_ENV === "production" ? [] : [err.stack],
  });
};

module.exports = errorHandler;