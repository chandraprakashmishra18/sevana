import "./ActionCard.css";

export default function ActionCard({
  icon: Icon,
  title,
  subtitle,
  color = "#10b981",
  onClick,
}) {
  return (
    <button className="action-card" onClick={onClick} type="button">
      <div
        className="action-icon"
        style={{ backgroundColor: `${color}15`, color }}
      >
        <Icon size={28} />
      </div>

      <div className="action-content">
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
    </button>
  );
}
