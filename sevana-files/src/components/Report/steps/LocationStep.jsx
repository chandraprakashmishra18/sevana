import { useState } from "react";
import { MapPin, LocateFixed, ExternalLink } from "lucide-react";

import {
  getCurrentLocation,
  reverseGeocode,
} from "../../../services/geo.service";

import Button from "../../Common/Button/Button";
import Loader from "../../Common/Loader/Loader";
import "./LocationStep.css";

export default function LocationStep({
  formData,
  updateFields,
  next,
  back,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const detectLocation = async () => {
    try {
      setLoading(true);
      setError("");

      const { latitude, longitude } =
        await getCurrentLocation();

      const location = await reverseGeocode(
        latitude,
        longitude
      );

      updateFields(location);
    } catch (err) {
      setError(
        err.message || "Unable to detect your location."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!formData.latitude || !formData.longitude) {
      setError("Please detect your current location.");
      return;
    }

    setError("");
    next();
  };

  return (
    <div className="report-step">

      <div className="step-header">
        <h2>Animal Location</h2>

        <p>
          Detect your location so nearby volunteers can
          reach the animal as quickly as possible.
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

          <a
            className="map-link"
            href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} />
            View on Google Maps
          </a>

        </div>
      )}

      <div className="input-group">
        <label>Landmark</label>

        <input
          type="text"
          placeholder="Temple, School, Bus Stop..."
          value={formData.landmark}
          onChange={(e) =>
            updateFields({
              landmark: e.target.value,
            })
          }
        />
      </div>

      <div className="input-row">

        <div className="input-group">
          <label>City</label>

          <input
            type="text"
            value={formData.city}
            onChange={(e) =>
              updateFields({

export default function LocationStep({
  formData,
  updateFields,
  next,
  back,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const detectLocation = async () => {
    try {
      setLoading(true);
      setError("");

      const { latitude, longitude } =
        await getCurrentLocation();

      const location = await reverseGeocode(
        latitude,
        longitude
      );

      updateFields(location);
    } catch (err) {
      setError(
        err.message || "Unable to detect your location."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!formData.latitude || !formData.longitude) {
      setError("Please detect your current location.");
      return;
    }

    setError("");
    next();
  };

  return (
    <div className="report-step">

      <div className="step-header">
        <h2>Animal Location</h2>

        <p>
          Detect your location so nearby volunteers can
          reach the animal as quickly as possible.
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

          <a
            className="map-link"
            href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} />
            View on Google Maps
          </a>

        </div>
      )}

      <div className="input-group">
        <label>Landmark</label>

        <input
          type="text"
          placeholder="Temple, School, Bus Stop..."
          value={formData.landmark}
          onChange={(e) =>
            updateFields({
              landmark: e.target.value,
            })
          }
        />
      </div>

      <div className="input-row">

        <div className="input-group">
          <label>City</label>

          <input
            type="text"
            value={formData.city}
            onChange={(e) =>
              updateFields({
                city: e.target.value,
              })
            }
          />
        </div>

        <div className="input-group">
          <label>State</label>

          <input
            type="text"
            value={formData.state}
            onChange={(e) =>
              updateFields({
                state: e.target.value,
              })
            }
          />
        </div>

      </div>

      <div className="step-actions">

        <Button
          type="button"
          className="secondary-btn"
          onClick={back}
          disabled={loading}
        >
          ← Back
        </Button>

        <Button
          type="button"
          className="primary-btn"
          onClick={handleContinue}
          disabled={!formData.latitude || loading}
        >
          Continue →
        </Button>

      </div>

    </div>
  );
}
