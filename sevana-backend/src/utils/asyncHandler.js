// Express 4 does not forward rejected promises from async route handlers
// to next(err) automatically. Wrap every controller with this so thrown
// errors land in the central error handler in app.js instead of hanging
// the request or crashing the process.
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = asyncHandler;
