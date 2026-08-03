import { MapPin, Clock, ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import RescueStatusBadge from "./RescueStatusBadge";

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function RescueCard({ report }) {
  const navigate = useNavigate();
  const goToDetails = () => navigate(`/reports/${report.id}`);

  return (
    <div className="rescue-card" onClick={goToDetails}>
      {/* ---------- Image Container with Overlays ---------- */}
      <div className="rescue-image-container">
        {report.image ? (
          <img
            src={report.image}
            alt={report.animal_type}
            className="rescue-image"
          />
        ) : (
          <div className="rescue-image-placeholder">
            <span className="placeholder-paw">🐾</span>
            <span>No Image Available</span>
          </div>
        )}
        <div className="card-badge-overlay">
          <StatusBadge severity={report.severity} />
          <RescueStatusBadge status={report.status} />
        </div>
      </div>

      {/* ---------- Info Content ---------- */}
      <div className="rescue-card-content">
        <div className="rescue-card-header">
          <div>
            <h2 className="animal-type-title">{report.animal_type}</h2>
            {report.species && <p className="species-subtitle">{report.species}</p>}
          </div>
        </div>

        <div className="rescue-condition-text">{report.condition}</div>

        <div className="rescue-info-details">
          <div className="info-detail-row">
            <MapPin size={16} className="detail-icon" />
            <span className="detail-text">{report.address || "Location unavailable"}</span>
          </div>

          <div className="info-detail-row">
            <Clock size={16} className="detail-icon" />
            <span className="detail-text">{formatRelativeTime(report.created_at)}</span>
          </div>
        </div>

        {/* ---------- Footer ---------- */}
        <div className="rescue-card-footer">
          <div className="card-responder-count">
            <Users size={16} />
            <span>
              {report.responder_count || 0} active{" "}
              {report.responder_count === 1 ? "responder" : "responders"}
            </span>
          </div>

          <button
            className="card-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              goToDetails();
            }}
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
