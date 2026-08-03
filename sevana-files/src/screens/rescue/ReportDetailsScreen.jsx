import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, ShieldAlert, User, Users, Activity, HeartPulse, Heart, Share2, Compass } from "lucide-react";
import { useState } from "react";

import useReport from "../../hooks/useReport";
import useRespondToReport from "../../hooks/useRespondToReport";
import { useToast } from "../../context/ToastContext";
import RescueStatusBadge from "../../components/Rescue/RescueStatusBadge";
import StatusBadge from "../../components/Rescue/StatusBadge";
import "./ReportDetails.css";

export default function ReportDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);

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
        title: "Successfully Joined",
        message: "You have joined the rescue! Coordinates shared.",
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
        message: err?.response?.data?.message || "Something went wrong.",
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

  if (isError || !data) {
    return (
      <div className="report-details-container error-container">
        <ShieldAlert size={48} className="error-icon" />
        <h2>Failed to load report.</h2>
        <p>Please check your connection and try again.</p>
        <button className="back-button-err" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to Feed
        </button>
      </div>
    );
  }

  const report = data;

  return (
    <div className="report-details-page-wrapper">
      {/* ---------- Absolute Header Overlays on Image ---------- */}
      <div className="details-image-hero">
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

        <div className="hero-floating-header">
          <button className="floating-round-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div className="hero-right-actions">
            <button className="floating-round-btn" onClick={() => showToast({
              type: "info",
              title: "Share",
              message: "Rescue details link copied to clipboard!"
            })}>
              <Share2 size={18} />
            </button>
            <button
              className={`floating-round-btn ${isFavorited ? "favorited" : ""}`}
              onClick={() => {
                setIsFavorited(!isFavorited);
                showToast({
                  type: "success",
                  title: isFavorited ? "Removed from Saved" : "Saved Rescue",
                  message: isFavorited ? "Removed from bookmarks." : "Saved to your rescue bookmarks."
                });
              }}
            >
              <Heart size={18} fill={isFavorited ? "#ef4444" : "none"} />
            </button>
          </div>
        </div>

        {/* Float badges on bottom of image */}
        <div className="hero-bottom-badges">
          <StatusBadge severity={report.severity} />
          <RescueStatusBadge status={report.status} />
        </div>
      </div>

      {/* ---------- Main Content Body (Slides Over Hero) ---------- */}
      <main className="details-content-sheet">
        {/* Title Section */}
        <div className="details-title-section">
          <h1 className="animal-title">{report.animal_type}</h1>
          {report.species && <p className="species-subtitle">{report.species}</p>}
        </div>

        {/* Reporter Card */}
        <div className="reporter-avatar-row">
          <div className="reporter-avatar">
            <User size={20} />
          </div>
          <div className="reporter-meta">
            <span className="reported-by-label">Reported by</span>
            <span className="reporter-name">{report.reporter_name || "Anonymous Hero"}</span>
          </div>
          <div className="reported-time-stamp">
            <Clock size={12} />
            <span>{new Date(report.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="info-cards-grid">
          {/* Card 1: Animal Specs */}
          <div className="info-card">
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
                <span className="grid-value">{report.estimated_age || "Unknown"}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Incident Condition */}
          <div className="info-card">
            <div className="card-header">
              <HeartPulse size={18} className="card-icon alert-icon" />
              <h3>Condition Description</h3>
            </div>
            <div className="condition-content">
              <p>{report.condition}</p>
            </div>
          </div>

          {/* Card 3: Location Details */}
          <div className="info-card">
            <div className="card-header">
              <MapPin size={18} className="card-icon map-icon" />
              <h3>Incident Location</h3>
            </div>
            <div className="location-content">
              <p className="address-text">{report.address || "Address unavailable"}</p>
            </div>
          </div>
        </div>
      </main>

      {/* ---------- Sticky Bottom Action Bar ---------- */}
      <footer className="details-action-footer">
        <button
          className="footer-nav-btn"
          onClick={() =>
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${report.latitude},${report.longitude}`,
              "_blank"
            )
          }
          title="Navigate to Animal"
        >
          <Compass size={20} />
          <span>Navigate</span>
        </button>

        <button
          className="respond-btn"
          disabled={respondMutation.isPending}
          onClick={handleRespond}
        >
          {respondMutation.isPending ? (
            <span className="btn-spinner">Joining...</span>
          ) : (
            <>
              <span>🚑 I'm Responding</span>
            </>
          )}
        </button>
      </footer>
    </div>
  );
}