import React from "react";
import "./RescueStatusBadge.css";

const STATUS_BADGE_CONFIG = {
  reported: {
    label: "Reported",
    color: "#b45309", // Dark yellow/amber
    bg: "#fef9c3",    // Light yellow
    dotColor: "#fbbf24", // Yellow dot
  },
  responders_joining: {
    label: "Responders Joining",
    color: "#c2410c", // Dark orange
    bg: "#ffedd5",    // Light orange
    dotColor: "#fb923c",
  },
  responder_on_site: {
    label: "Responder On Site",
    color: "#c2410c",
    bg: "#ffedd5",
    dotColor: "#fb923c",
  },
  under_treatment: {
    label: "Under Treatment",
    color: "#1d4ed8", // Dark blue
    bg: "#eff6ff",    // Light blue
    dotColor: "#60a5fa",
  },
  first_aid_given: {
    label: "First Aid Given",
    color: "#1d4ed8",
    bg: "#eff6ff",
    dotColor: "#60a5fa",
  },
  transport_in_progress: {
    label: "Transport In Progress",
    color: "#1d4ed8",
    bg: "#eff6ff",
    dotColor: "#60a5fa",
  },
  at_veterinary_clinic: {
    label: "At Vet Clinic",
    color: "#1d4ed8",
    bg: "#eff6ff",
    dotColor: "#60a5fa",
  },
  recovering: {
    label: "Recovering",
    color: "#1d4ed8",
    bg: "#eff6ff",
    dotColor: "#60a5fa",
  },
  rescued: {
    label: "Rescued",
    color: "#047857", // Dark green
    bg: "#dcfce7",    // Light green
    dotColor: "#34d399",
  },
  closed: {
    label: "Closed",
    color: "#374151", // Dark grey
    bg: "#f3f4f6",    // Light grey
    dotColor: "#9ca3af",
  },
};

export default function RescueStatusBadge({ status }) {
  const normalizedStatus = status ? status.toLowerCase() : "reported";
  const config = STATUS_BADGE_CONFIG[normalizedStatus] || STATUS_BADGE_CONFIG.reported;

  return (
    <span
      className="rescue-status-badge"
      style={{
        color: config.color,
        backgroundColor: config.bg,
        border: `1px solid ${config.color}25`,
      }}
    >
      <span
        className="status-dot"
        style={{ backgroundColor: config.dotColor }}
      />
      {config.label}
    </span>
  );
}
