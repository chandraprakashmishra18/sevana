import client from "./client";

/**
 * Register a new user
 */
export async function register(data) {
  const response = await client.post("/api/v1/auth/register", data);
  return response.data;
}

/**
 * Login using email OR phone
 */
export async function login(data) {
  const response = await client.post("/api/v1/auth/login", data);
  return response.data;
}

/**
 * Get current logged-in user
 */
export async function getMe() {
  const response = await client.get("/api/v1/auth/me");
  return response.data;
}