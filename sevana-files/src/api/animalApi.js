import client from "./client";

// Upload image to Cloudinary through backend
export async function uploadPhoto(file) {
  const formData = new FormData();
  formData.append("photo", file);

  const { data } = await client.post("/api/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

// Create Animal Report
export async function createReport(reportData) {
  const { data } = await client.post("/api/animals", reportData);
  return data;
}

// Get Nearby Reports
export async function getReports(params = {}) {
  const { data } = await client.get("/api/animals", {
    params,
  });

  return data;
}

// Get Single Report
export async function getReport(id) {
  const { data } = await client.get(`/api/animals/${id}`);
  return data;
}

// Raise Hand
export async function respondToReport(id, note = "") {
  const { data } = await client.post(`/api/animals/${id}/respond`, {
    note,
  });

  return data;
}

// Update Report Status
export async function updateStatus(id, status) {
  const { data } = await client.patch(`/api/animals/${id}/status`, {
    status,
  });

  return data;
}

// Home Screen Stats
export async function getMyStats(lat, lng) {
  const { data } = await client.get("/api/users/me/stats", {
    params: {
      lat,
      lng,
    },
  });

  return data;
}

