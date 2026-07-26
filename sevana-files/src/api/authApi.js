import client from "./client";

/**
 * Register a new user
 */
export const register = async (data) => {
  const response = await client.post("/api/v1/auth/register", data);
  return response.data;
};

/**
 * Login existing user
 */
export const login = async (credentials) => {
  const response = await client.post("/api/v1/auth/login", credentials);
  return response.data;
};

/**
 * Get logged-in user
 */
export const getMe = async () => {
  const response = await client.get("/api/v1/auth/me");
  return response.data;
};
