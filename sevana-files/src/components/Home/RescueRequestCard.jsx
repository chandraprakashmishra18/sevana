import { MapPin, Clock } from "lucide-react";

import "./RescueRequestCard.css";

export default function RescueRequestCard({ report }) {
  return (
    <article className="rescue-card">

      <img
        src={report.image_url}
        alt={report.animal_type}
        className="rescue-image"
      />

      <div className="rescue-content">

        <h3>
          {report.animal_type}
        </h3>

        <div className="rescue-meta">

          <span>
            <MapPin size={15} />
            {report.distance} km
          </span>

          <span>
            <Clock size={15} />
            {report.created_at}
          </span>

        </div>

        <p>
          {report.description}
        </p>

      </div>

    </article>
  );
}