const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

function generateAccessToken(payload) {
  return jwt.sign(
    payload,
    jwtConfig.accessToken.secret,
    {
      expiresIn: jwtConfig.accessToken.expiresIn,
      algorithm: "HS256",
    }
  );
}

function generateRefreshToken(payload) {
  return jwt.sign(
    payload,
    jwtConfig.refreshToken.secret,
    {
      expiresIn: jwtConfig.refreshToken.expiresIn,
      algorithm: "HS256",
    }
  );
}

function verifyAccessToken(token) {
  return jwt.verify(token, jwtConfig.accessToken.secret, { algorithms: ["HS256"] });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, jwtConfig.refreshToken.secret, { algorithms: ["HS256"] });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
