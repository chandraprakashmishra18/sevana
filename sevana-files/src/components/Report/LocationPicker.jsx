import { useState } from "react";
import { MapPin } from "lucide-react";

import "./Report.css";

export default function LocationPicker({
  onLocationSelect,
}) {
  const [loading, setLoading] = useState(false);

  function detectLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);

        onLocationSelect({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setLoading(false);
        alert("Unable to fetch your location.");
      }
    );
  }

  return (
    <div className="form-group">
      <label>Location</label>

      <button
        type="button"
        className="location-btn"
        onClick={detectLocation}
      >
        <MapPin size={18} />

        {loading
          ? "Detecting..."
          : "Use Current Location"}
      </button>
    </div>
  );
}