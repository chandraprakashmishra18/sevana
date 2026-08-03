import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock } from "lucide-react";

import useReport from "../../hooks/useReport";
import useRespondToReport from "../../hooks/useRespondToReport";
import { useToast } from "../../context/ToastContext";

import "./ReportDetails.css";

export default function ReportDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { showToast } = useToast();

  const {
    data: report,
    isLoading,
    isError,
    refetch,
  } = useReport(id);

  const respondMutation = useRespondToReport();

  async function handleRespond() {
    try {
      await respondMutation.mutateAsync({
        id,
        notes: "",
      });

      showToast({
        type: "success",
        title: "Joined Rescue",
        message: "You have successfully joined this rescue.",
      });

      await refetch();
    } catch (err) {
      showToast({
        type: "error",
        title: "Unable to Join",
        message:
          err?.response?.data?.message ||
          "Something went wrong.",
      });
    }
  }

  if (isLoading) {
    return (
      <div className="report-details-page">
        Loading...
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="report-details-page">
        Failed to load report.
      </div>
    );
  }

  return (
    <div className="report-details-page">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {report.image && (
        <img
          src={report.image}
          alt={report.animal_type}
          className="report-image"
        />
      )}

      <div className="report-header">

        <h1>{report.animal_type}</h1>

        <span className={`severity ${report.severity}`}>
          {report.severity.toUpperCase()}
        </span>

      </div>

      <p className="species">
        {report.species || "Unknown Species"}
      </p>

      <div className="detail-card">

        <h3>Condition</h3>

        <p>{report.condition}</p>

      </div>

      <div className="detail-grid">

        <div>
          <strong>Breed</strong>
          <p>{report.breed || "Unknown"}</p>
        </div>

        <div>
          <strong>Gender</strong>
          <p>{report.gender}</p>
        </div>

        <div>
          <strong>Age</strong>
          <p>{report.estimated_age}</p>
        </div>

        <div>
          <strong>Status</strong>
          <p>{report.status}</p>
        </div>

      </div>

      <div className="detail-card">

        <h3>Location</h3>

        <p>
          <MapPin size={18} />
          {" "}
          {report.address}
        </p>

        <a
          href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
          target="_blank"
          rel="noreferrer"
        >
          📍 Open in Google Maps
        </a>

      </div>

      <div className="detail-card">

        <h3>Report Information</h3>

        <p>
          👤 {report.reporter_name}
        </p>

        <p>
          👥 {report.responder_count} Responders
        </p>

        <p>
          <Clock size={18} />
          {" "}
          {new Date(report.created_at).toLocaleString()}
        </p>

      </div>

      <button
        className="respond-btn"
        disabled={respondMutation.isPending}
        onClick={handleRespond}
      >
        {respondMutation.isPending
          ? "Joining..."
          : "🚑 I'm Responding"}
      </button>

    </div>
  );
}