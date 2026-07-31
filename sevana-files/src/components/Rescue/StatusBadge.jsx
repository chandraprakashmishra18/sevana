const STATUS_CONFIG = {
  low: {
    label: "Low",
    className: "status-low",
  },
  medium: {
    label: "Medium",
    className: "status-medium",
  },
  high: {
    label: "High",
    className: "status-high",
  },
  critical: {
    label: "Critical",
    className: "status-critical",
  },
};

export default function StatusBadge({ severity }) {
  const badge =
    STATUS_CONFIG[severity] || STATUS_CONFIG.low;

  return (
    <span className={`status-badge ${badge.className}`}>
      {badge.label}
    </span>
  );
}