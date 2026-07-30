import * as authApi from "../api/authApi";

/**
 * Register a new user
 */
export async function registerUser(userData) {
  const response = await authApi.register(userData);

  return response.data;
}

/**
 * Login user
 */
export async function loginUser(credentials) {
  const response = await authApi.login(credentials);

  return response.data;
}

/**
 * Fetch authenticated user
 */
export async function fetchCurrentUser() {
  const response = await authApi.getMe();

  return response.data;
}