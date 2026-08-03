import client from "./client";

export async function register(data) {
  console.log("➡️ Register Request:", data);

  try {
    const response = await client.post("/api/v1/auth/register", data);

    console.log("✅ Register Response:", response);

    return response.data;
  } catch (error) {
    console.log("❌ Register Error:", error.response);
    throw error;
  }
}

export async function login(data) {
  const response = await client.post("/api/v1/auth/login", data);
  return response.data;
}

export async function getMe() {
  const response = await client.get("/api/v1/auth/me");
  return response.data;
}