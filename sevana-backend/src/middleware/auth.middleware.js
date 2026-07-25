const ApiError = require("../errors/api.error");
const { verifyAccessToken } = require("../utils/jwt.util");

function requireAuth(req, res, next) {
  console.log("Authorization Header:", req.headers.authorization);

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError({
        statusCode: 401,
        message: "Authentication required.",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);

    const decoded = verifyAccessToken(token);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);

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
