import api from "../api/client";

/**
 * Create Animal Rescue Report
 */
export async function createReport(formData) {
  const payload = {
    // Animal
    animal_type: formData.animal_type,
    species: formData.species,
    breed: formData.breed,
    gender: formData.gender,
    estimated_age: formData.estimated_age,
    color: formData.color,

    // Rescue
    severity: formData.severity,
    condition: formData.condition,
    description: formData.description,

    // Location
    latitude: formData.latitude,
    longitude: formData.longitude,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    landmark: formData.landmark,

    // Photos
    images: formData.images || [],
  };

  const response = await api.post(
    "/api/v1/reports",
    payload
  );

  return response.data.data;
}

/**
 * Get Rescue Reports
 */
export async function getReports(filters = {}) {
  const response = await api.get(
    "/api/v1/reports",
    {
      params: filters,
    }
  );

  return response.data.data;
}

/**
 * Get Single Report
 */
export async function getReport(id) {
  const response = await api.get(
    `/api/v1/reports/${id}`
  );

  return response.data.data;
}

/**
 * Volunteer Response
 */
export async function respondToReport(
  id,
  notes = ""
) {
  const response = await api.post(
    `/api/v1/reports/${id}/respond`,
    {
      notes,
    }
  );

  return response.data.data;
}

/**
 * Update Status
 */
export async function updateReportStatus(
  id,
  status
) {
  const response = await api.patch(
    `/api/v1/reports/${id}/status`,
    {
      status,
    }
  );

  return response.data.data;
}