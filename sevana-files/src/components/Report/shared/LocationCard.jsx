import { useState } from "react";
import { MapPin } from "lucide-react";
import { useToast } from "../../../context/ToastContext";

import "./LocationCard.css";

export default function LocationCard({
  onLocationSelect,
}) {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  function detectLocation() {
    if (!navigator.geolocation) {
      showToast({
        type: "error",
        title: "Not Supported",
        message: "Geolocation is not supported by your browser.",
      });
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

        showToast({
          type: "success",
          title: "Location Detected",
          message: "Coordinates captured successfully.",
        });
      },
      () => {
        setLoading(false);
        showToast({
          type: "error",
          title: "Error",
          message: "Unable to fetch your location.",
        });
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
        disabled={loading}
      >
        <MapPin size={18} className={loading ? "spin" : ""} />

        {loading
          ? "Detecting..."
          : "Use Current Location"}
      </button>
    </div>
  );
}
