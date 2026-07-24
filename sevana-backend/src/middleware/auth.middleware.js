const ApiError = require("../errors/api.error");
const { verifyAccessToken } = require("../utils/jwt.util");

function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError({
        statusCode: 401,
        message: "Authentication required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    next(
      new ApiError({
        statusCode: 401,
        message: "Invalid or expired token.",
      })
    );
  }
}

module.exports = {
  requireAuth,
};