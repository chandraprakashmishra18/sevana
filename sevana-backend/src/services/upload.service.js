import api from "../api/client";

export async function uploadPhoto(file) {
  const formData = new FormData();

  formData.append("photo", file);

  const response = await api.post(
    "/api/v1/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data.data;
}