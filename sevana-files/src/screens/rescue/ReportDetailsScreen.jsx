import { useParams } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";

import useReport from "../../hooks/useReport";

export default function ReportDetailsScreen() {
  const { id } = useParams();

  const { data, isLoading, isError } = useReport(id);

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>Failed to load report.</h2>;

  const report = data;

  return (
    <div className="report-details-page">

      {report.image && (
        <img
          src={report.image}
          alt={report.animal_type}
          className="report-image"
        />
      )}

      <h1>{report.animal_type}</h1>

      <h3>{report.species}</h3>

      <p>
        <strong>Condition:</strong>
        <br />
        {report.condition}
      </p>

      <p>
        <strong>Severity:</strong>{" "}
        {report.severity}
      </p>

      <p>
        <strong>Breed:</strong>{" "}
        {report.breed || "Unknown"}
      </p>

      <p>
        <strong>Gender:</strong>{" "}
        {report.gender}
      </p>

      <p>
        <strong>Estimated Age:</strong>{" "}
        {report.estimated_age}
      </p>

      <p>
        <MapPin size={18} />
        {" "}
        {report.address}
      </p>

      <p>
        <Clock size={18} />
        {" "}
        {new Date(report.created_at).toLocaleString()}
      </p>

      <p>
        👤 {report.reporter_name}
      </p>

      <p>
        👥 {report.responder_count} Responders
      </p>

      <button className="respond-btn">
        🚑 I'm Responding
      </button>

    </div>
  );
}