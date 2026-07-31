import { useState } from "react";
import { MapPin } from "lucide-react";
import { useToast } from "../../context/ToastContext";

import "./Report.css";

export default function LocationPicker({
  onLocationSelect,
}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  function detectLocation() {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported.");
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
        toast.error("Unable to fetch your location.");
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
