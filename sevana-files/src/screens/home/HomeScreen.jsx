import { useNavigate } from "react-router-dom";
import HeroCard from "../../components/Home/HeroCard";
import XPCard from "../../components/Home/XPCard";
import QuickActions from "../../components/Home/QuickActions";
import { useAuth } from "../../context/AuthContext";
import useReports from "../../hooks/useReports";
import RescueStatusBadge from "../../components/Rescue/RescueStatusBadge";
import StatusBadge from "../../components/Rescue/StatusBadge";
import { MapPin, Clock, ArrowRight, HeartPulse } from "lucide-react";
import "./HomeScreen.css";

export default function HomeScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: reports, isLoading } = useReports();

  // Find the first active rescue (not rescued or closed)
  const activeRescue = reports?.find(
    (r) => r.status !== "rescued" && r.status !== "closed"
  );

  // Get the 3 most recent reports
  const recentReports = reports?.slice(0, 3) || [];

  return (
    <div className="home-screen-container">
      {/* Hero Section & Welcome Banner */}
      <HeroCard user={user} />

      {/* Progress XP Card */}
      <XPCard
        xp={user?.xp || 250}
        level={user?.level || 1}
        nextLevelXP={500}
      />

      {/* Better Quick Actions */}
      <QuickActions />

      {/* Beautiful Active Rescue Card */}
      <section className="home-section active-rescue-section">
        <h3 className="section-title">🚨 Active Rescue Request</h3>
        {isLoading ? (
          <div className="active-rescue-loading">
            <div className="loader-spinner-small" />
            <span>Fetching active cases...</span>
          </div>
        ) : activeRescue ? (
          <div
            className="premium-active-card"
            onClick={() => navigate(`/reports/${activeRescue.id}`)}
          >
            <div className="active-card-image-wrapper">
              {activeRescue.image ? (
                <img
                  src={activeRescue.image}
                  alt={activeRescue.animal_type}
                  className="active-card-img"
                />
              ) : (
                <div className="active-card-placeholder">
                  <HeartPulse size={36} />
                  <span>No Image Available</span>
                </div>
              )}
              <div className="active-card-badges">
                <StatusBadge severity={activeRescue.severity} />
                <RescueStatusBadge status={activeRescue.status} />
              </div>
            </div>

            <div className="active-card-body">
              <div className="active-card-header">
                <h4>{activeRescue.animal_type}</h4>
                {activeRescue.species && (
                  <span className="active-species">{activeRescue.species}</span>
                )}
              </div>

              <p className="active-condition">{activeRescue.condition}</p>

              <div className="active-meta-rows">
                <div className="active-meta-item">
                  <MapPin size={15} />
                  <span>{activeRescue.address || "Location unavailable"}</span>
                </div>
                <div className="active-meta-item">
                  <Clock size={15} />
                  <span>
                    {new Date(activeRescue.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button className="active-respond-btn">
                <span>View Rescue Mission</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="no-active-rescues-card">
            <div className="no-rescue-icon">🕊️</div>
            <h4>All Clear Nearby!</h4>
            <p>There are no active animal rescues pending at this moment.</p>
          </div>
        )}
      </section>

      {/* Better Recent Reports */}
      <section className="home-section recent-reports-section">
        <div className="section-header-row">
          <h3 className="section-title">Recent Reports</h3>
          <button className="view-all-link" onClick={() => navigate("/rescue")}>
            View Feed
          </button>
        </div>

        {isLoading ? (
          <div className="recent-reports-loading">
            <div className="loader-spinner-small" />
          </div>
        ) : recentReports.length > 0 ? (
          <div className="recent-reports-list">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="compact-report-item"
                onClick={() => navigate(`/reports/${report.id}`)}
              >
                <div className="compact-img-wrapper">
                  {report.image ? (
                    <img src={report.image} alt={report.animal_type} />
                  ) : (
                    <div className="compact-placeholder">🐾</div>
                  )}
                </div>
                <div className="compact-details">
                  <div className="compact-header-row">
                    <h5>{report.animal_type}</h5>
                    <span
                      className={`compact-severity-badge ${report.severity.toLowerCase()}`}
                    >
                      {report.severity}
                    </span>
                  </div>
                  <p className="compact-location">
                    <MapPin size={12} />
                    <span>{report.city || "Nearby"}</span>
                  </p>
                </div>
                <ChevronRightIcon className="compact-arrow" />
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reports-text">No reports submitted recently.</p>
        )}
      </section>
    </div>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className={className}
      style={{ width: "16px", height: "16px", color: "#9ca3af" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
