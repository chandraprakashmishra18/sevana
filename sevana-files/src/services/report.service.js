import api from "../api/client";

export async function getNearbyReports(params = {}) {
  const response = await api.get("/api/v1/reports/nearby", {
    params,
  });

  return response.data.data;
}

export async function getMyReports() {
  const response = await api.get("/api/v1/reports/me");

  return response.data.data;
}

export async function createReport(formData) {
  const response = await api.post(
    "/api/v1/reports",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
}