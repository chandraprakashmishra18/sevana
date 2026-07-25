const authRepository = require("../repositories/auth.repository");
const ApiError = require("../errors/api.error");

const { hashPassword, comparePassword } = require("../utils/password.util");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt.util");

const toPublicUser = require("../mappers/user.mapper");
const ROLES = require("../constants/roles");

async function registerUser(data) {
  const { full_name, email, phone, password } = data;

  if (email) {
    const existingEmail = await authRepository.findByEmail(email);

    if (existingEmail) {
      throw new ApiError({
        statusCode: 409,
        message: "Email already registered.",
      });
    }
  }

  const existingPhone = await authRepository.findByPhone(phone);

  if (existingPhone) {
    throw new ApiError({
      statusCode: 409,
      message: "Phone number already registered.",
    });
  }

  const password_hash = await hashPassword(password);

  const user = await authRepository.createUser({
    full_name,
    email,
    phone,
    password_hash,
    role: ROLES.USER,
  });

  const payload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    user: toPublicUser(user),
    accessToken,
    refreshToken,
  };
}

async function loginUser(identifier, password) {
  const user = await authRepository.findByIdentifier(identifier);

console.log("User found:", !!user);
if (!user) {
  throw new ApiError({
    statusCode: 401,
    message: "Invalid credentials.",
  });
}

console.log("Entered password:", password);
console.log("Stored hash:", user.password_hash);

const validPassword = await comparePassword(
  password,
  user.password_hash
);

console.log("Password match:", validPassword);

if (!validPassword) {
  throw new ApiError({
    statusCode: 401,
    message: "Invalid credentials.",
  });
}

  await authRepository.updateLastLogin(user.id);

  const payload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    user: toPublicUser(user),
    accessToken,
    refreshToken,
  };
}

async function getCurrentUser(userId) {
  const user = await authRepository.findById(userId);

  if (!user) {
    throw new ApiError({
      statusCode: 404,
      message: "User not found.",
    });
  }

  return toPublicUser(user);
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
