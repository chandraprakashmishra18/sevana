import { useState } from "react";
import { MapPin, LocateFixed, Loader2 } from "lucide-react";

import {
  getCurrentLocation,
  reverseGeocode,
} from "../../../services/geo.service";

export default function LocationStep({
  formData,
  updateField,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const detectLocation = async () => {
    try {
      setLoading(true);
      setError("");

      const { latitude, longitude } =
        await getCurrentLocation();

      const location =
        await reverseGeocode(latitude, longitude);

      Object.entries(location).forEach(([key, value]) =>
        updateField(key, value)
      );
    } catch (err) {
      setError(
        err.message || "Unable to detect location."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-step">

      <div className="step-header">
        <h2>Animal Location</h2>

        <p>
          Detect your current location so nearby
          volunteers can reach the animal quickly.
        </p>
      </div>

      <button
        type="button"
        className="location-btn"
        onClick={detectLocation}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2
              size={18}
              className="spin"
            />

            Detecting...
          </>
        ) : (
          <>
            <LocateFixed size={18} />

            Detect Current Location
          </>
        )}
      </button>

      {error && (
        <div className="location-error">
          {error}
        </div>
      )}

      {formData.latitude && (
        <div className="location-card">

          <div className="location-item">
            <MapPin size={18} />

            <div>
              <strong>Latitude</strong>

              <span>{formData.latitude}</span>
            </div>
          </div>

          <div className="location-item">
            <MapPin size={18} />

            <div>
              <strong>Longitude</strong>

              <span>{formData.longitude}</span>
            </div>
          </div>

          <div className="location-item">
            <MapPin size={18} />

            <div>
              <strong>Address</strong>

              <span>
                {formData.address || "Not Available"}
              </span>
            </div>
          </div>

          <div className="verified-badge">
            ✓ Location Verified
          </div>

        </div>
      )}

    </div>
  );
}