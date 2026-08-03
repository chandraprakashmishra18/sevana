import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, ArrowLeft, ShieldAlert, User, Users, Activity, HeartPulse } from "lucide-react";

import useReport from "../../hooks/useReport";
import useRespondToReport from "../../hooks/useRepondToReport";
import { useToast } from "../../context/ToastContext";
import "./ReportDetails.css";

export default function ReportDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (isLoading) {
    return (
      <div className="report-details-container loading-container">
        <div className="loader-spinner"></div>
        <p>Loading rescue request details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="report-details-container error-container">
        <ShieldAlert size={48} className="error-icon" />
        <h2>Failed to load report.</h2>
        <p>Please check your connection and try again.</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to Feed
        </button>
      </div>
    );
  }

  const report = data;

  return (
    <div className="report-details-container">
      {/* Header / Navigation */}
      <header className="details-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="header-title">Rescue Request</h1>
      </header>

      <main className="details-main">
        {/* Hero Section */}
        <div className="details-hero">
          {report.image ? (
            <img
              src={report.image}
              alt={report.animal_type}
              className="hero-image"
            />
          ) : (
            <div className="hero-image-placeholder">
              <HeartPulse size={48} className="placeholder-icon" />
              <span>No Image Available</span>
            </div>
          )}
          <div className="hero-overlay">
            <div className="hero-meta">
              <span className={`severity-badge ${report.severity.toLowerCase()}`}>
                <ShieldAlert size={14} />
                {report.severity.toUpperCase()}
              </span>
              <h2 className="animal-title">{report.animal_type}</h2>
              {report.species && <p className="species-subtitle">{report.species}</p>}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="info-cards-grid">
          {/* Card 1: Animal Details */}
          <div className="info-card animal-details-card">
            <div className="card-header">
              <Activity size={18} className="card-icon" />
              <h3>Animal Details</h3>
            </div>
            <div className="details-grid">
              <div className="grid-item">
                <span className="grid-label">Breed</span>
                <span className="grid-value">{report.breed || "Unknown"}</span>
              </div>
              <div className="grid-item">
                <span className="grid-label">Gender</span>
                <span className="grid-value capitalize">{report.gender}</span>
              </div>
              <div className="grid-item">
                <span className="grid-label">Estimated Age</span>
                <span className="grid-value">{report.estimated_age}</span>
              </div>
              <div className="grid-item">
                <span className="grid-label">Status</span>
                <span className="grid-value status-value capitalize">
                  {report.status ? report.status.replace(/_/g, " ") : "Reported"}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Incident Condition */}
          <div className="info-card condition-card">
            <div className="card-header">
              <HeartPulse size={18} className="card-icon alert-icon" />
              <h3>Condition Description</h3>
            </div>
            <div className="condition-content">
              <p>{report.condition}</p>
            </div>
          </div>

          {/* Card 3: Location Details */}
          <div className="info-card location-card">
            <div className="card-header">
              <MapPin size={18} className="card-icon map-icon" />
              <h3>Location</h3>
            </div>
            <div className="location-content">
              <p className="address-text">{report.address}</p>
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
            </div>
          </div>

          {/* Card 4: Reporter & Rescue Team */}
          <div className="info-card reporter-card">
            <div className="card-header">
              <User size={18} className="card-icon user-icon" />
              <h3>Report Info</h3>
            </div>
            <div className="reporter-content">
              <div className="info-row">
                <User size={16} />
                <span>Reported by: <strong>{report.reporter_name}</strong></span>
              </div>
              <div className="info-row">
                <Clock size={16} />
                <span>Time: <strong>{new Date(report.created_at).toLocaleString()}</strong></span>
              </div>
              <div className="info-row count-row">
                <Users size={16} />
                <span>Active Responders: <strong className="count-badge">{report.responder_count}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="action-container">
          <button
            className="respond-btn"
            disabled={respondMutation.isPending}
            onClick={handleRespond}
          >
            {respondMutation.isPending ? (
              <span className="btn-spinner">Joining Rescue...</span>
            ) : (
              <>
                <span>🚑 I'm Responding</span>
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}