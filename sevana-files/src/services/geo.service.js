export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });

export async function reverseGeocode(latitude, longitude) {
  const params = new URLSearchParams({
    format: "jsonv2",
    lat: String(latitude),
    lon: String(longitude),
  });
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?${params}`
  );

  if (!response.ok) {
    throw new Error("Unable to look up the detected location.");
  }

  const data = await response.json();
  const address = data.address ?? {};

  if (!data.display_name) {
    throw new Error("No address was found for this location.");
  }

  return {
    address: data.display_name,
    city:
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      "",
    state: address.state || "",
    postcode: address.postcode || "",
    landmark: address.neighbourhood || address.suburb || "",
    latitude,
    longitude,
  };
}
