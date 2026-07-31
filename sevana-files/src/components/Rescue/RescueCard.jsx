import { MapPin, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "./StatusBadge";

export default function RescueCard({ report }) {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/reports/${report.id}`);
  };

  return (
    <div className="rescue-card">

      <div className="rescue-card-header">

        <div>
          <h2>
            {report.animal_type}
          </h2>

          <p>
            {report.species || "Unknown Species"}
          </p>
        </div>

        <StatusBadge severity={report.severity} />

      </div>

      <div className="rescue-condition">
        {report.condition}
      </div>

      <div className="rescue-info">

        <div className="rescue-info-item">
          <MapPin size={16} />
          <span>
            {report.address || "Location unavailable"}
          </span>
        </div>

        <div className="rescue-info-item">
          <Clock size={16} />
          <span>
            {new Date(
              report.created_at
            ).toLocaleString()}
          </span>
        </div>

      </div>

      <div className="rescue-footer">

        <span>
          👥 {report.responder_count || 0} Responders
        </span>

        <button
          className="view-report-btn"
          onClick={goToDetails}
        >
          View Details

          <ArrowRight size={18} />
        </button>

      </div>

    </div>
  );
}