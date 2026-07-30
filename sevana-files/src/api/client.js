import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("sevana_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle API errors globally
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Backend server is unreachable.");
    } else {
      console.error("API Error:", error.response.data);
    }

    return Promise.reject(error);
  },
);

export default client;
