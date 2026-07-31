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
  // Placeholder for now.
  // Later we'll integrate OpenStreetMap or Google Maps.
  return {
    address: "",
    city: "",
    state: "",
    landmark: "",
    latitude,
    longitude,
  };
}