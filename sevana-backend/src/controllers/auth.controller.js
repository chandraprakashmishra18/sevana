const authService = require("../services/auth.service");
const { success, created } = require("../shared/response");
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validator");

async function register(req, res, next) {
  try {
    const data = registerSchema.parse(req.body);

    const result = await authService.registerUser(data);

    return created(res, {
      message: "User registered successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const data = loginSchema.parse(req.body);

    const result = await authService.loginUser(
      data.identifier,
      data.password
    );

    return success(res, {
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res, next) {
  try {
    const user = await authService.getCurrentUser(req.user.id);

    return success(res, {
      message: "User fetched successfully.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  me,
};