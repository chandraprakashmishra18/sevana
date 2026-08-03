import { MapPin, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "./StatusBadge";

export default function RescueCard({ report }) {
  console.log(report);

  const navigate = useNavigate();
  const goToDetails = () => navigate(`/reports/${report.id}`);

  return (
    <div className="rescue-card" onClick={goToDetails}>
      {/* ---------- Animal Image ---------- */}

      {report.image && (
        <img
          src={report.image}
          alt={report.animal_type}
          className="rescue-image"
        />
      )}

      {/* ---------- Header ---------- */}

      <div className="rescue-card-header">
        <div>
          <h2>{report.animal_type}</h2>
          <p>{report.species || "Unknown Species"}</p>
        </div>

        <StatusBadge severity={report.severity} />
      </div>

      {/* ---------- Condition ---------- */}

      <div className="rescue-condition">{report.condition}</div>

      {/* ---------- Info ---------- */}

      <div className="rescue-info">
        <div className="rescue-info-item">
          <MapPin size={16} />
          <span>{report.address || "Location unavailable"}</span>
        </div>

        <div className="rescue-info-item">
          <Clock size={16} />
          <span>{new Date(report.created_at).toLocaleString()}</span>
        </div>
      </div>

      {/* ---------- Footer ---------- */}

      <div className="rescue-footer">
        <span>👥 {report.responder_count || 0} Responders</span>

        <button
          className="view-report-btn"
          onClick={(e) => {
            e.stopPropagation();
            goToDetails();
          }}
        >
          View Details
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
