import { useParams } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";

import useReport from "../../hooks/useReport";
import useRespondToReport from "../../hooks/useRepondToReport";
import { useToast } from "../../context/ToastContext";
import "./ReportDetails.css";

export default function ReportDetailsScreen() {
  const { id } = useParams();
  const { showToast } = useToast();

  const { data, isLoading, isError } = useReport(id);
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
    } catch (err) {
      if (err?.response?.status === 409) {
        showToast({
          type: "info",
          title: "Already Joined",
          message: "You have already joined this rescue.",
        });
        return;
      }

      showToast({
        type: "error",
        title: "Unable to Join",
        message:
          err?.response?.data?.message ||
          "Something went wrong.",
      });
    }
  }

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

      <button
        className="maps-btn"
        onClick={() =>
          window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${report.latitude},${report.longitude}`,
            "_blank"
          )
        }
      >
        🧭 Navigate to Animal
      </button>

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

      <button
        className="respond-btn"
        disabled={respondMutation.isPending}
        onClick={handleRespond}
      >
        {respondMutation.isPending ? "Joining..." : "🚑 I'm Responding"}
      </button>

    </div>
  );
}