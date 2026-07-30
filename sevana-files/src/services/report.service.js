import api from "../api/client";

export async function getReports(params = {}) {
  const response = await api.get("/api/v1/reports", {
    params,
  });

  return response.data.data;
}

export async function getReport(id) {
  const response = await api.get(`/api/v1/reports/${id}`);

  return response.data.data;
}

export async function createReport(reportData) {
  const response = await api.post("/api/v1/reports", reportData);

  return response.data.data;
}

export async function updateReportStatus(id, status) {
  const response = await api.patch(`/api/v1/reports/${id}/status`, {
    status,
  });

  return response.data.data;
}

export async function respondToReport(id) {
  const response = await api.post(`/api/v1/reports/${id}/respond`);

  return response.data.data;
}
