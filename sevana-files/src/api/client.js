import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================================
// Request Interceptor
// =======================================
client.interceptors.request.use(
  (config) => {
    // Primary token (new)
    const token =
      localStorage.getItem("sevana_access_token") ||
      // Fallback for older builds
      localStorage.getItem("sevana_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// =======================================
// Response Interceptor
// =======================================
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        message: error.response.data?.message,
        data: error.response.data,
      });

      // Invalid / Expired Token
      if (error.response.status === 401) {
        localStorage.removeItem("sevana_access_token");
        localStorage.removeItem("sevana_refresh_token");

        // Legacy cleanup
        localStorage.removeItem("sevana_token");
      }
    } else if (error.request) {
      console.error("Network Error:", error.message);
    } else {
      console.error("Unexpected Error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default client;