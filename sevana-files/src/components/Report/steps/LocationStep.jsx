import { useState } from "react";
import { MapPin, LocateFixed } from "lucide-react";

import {
  getCurrentLocation,
  reverseGeocode,
} from "../../../services/geo.service";
import Button from "../../Common/Button/Button";
import Loader from "../../Common/Loader";

export default function LocationStep({
  formData,
  updateFields,
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

      updateFields(location);
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

      <Button
        className="location-btn"
        onClick={detectLocation}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader size="small" />

            Detecting...
          </>
        ) : (
          <>
            <LocateFixed size={18} />

            Detect Current Location
          </>
        )}
      </Button>

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
