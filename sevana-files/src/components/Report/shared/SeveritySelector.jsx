import "./SeveritySelector.css";

const levels = [
  {
    value: "low",
    label: "Low",
    color: "#4CAF50",
  },
  {
    value: "medium",
    label: "Medium",
    color: "#FFC107",
  },
  {
    value: "high",
    label: "High",
    color: "#FF9800",
  },
  {
    value: "critical",
    label: "Critical",
    color: "#F44336",
  },
];

export default function SeveritySelector({
  value,
  onChange,
  error,
}) {
  return (
    <div className="form-group">
      <label>Severity</label>

      <div className="severity-grid">
        {levels.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`severity-card ${
              value === item.value ? "active" : ""
            }`}
            style={{
              borderColor: item.color,
            }}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {error && <span className="error">{error}</span>}
    </div>
  );
}
