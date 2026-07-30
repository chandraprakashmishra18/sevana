import { ChevronRight } from "lucide-react";
import "./ActionCard.css";

export default function ActionCard({
  icon: Icon,
  title,
  subtitle,
  color = "#2E7D32",
  onClick,
}) {
  return (
    <button className="action-card" onClick={onClick} type="button">
      <div
        className="action-icon"
        style={{ backgroundColor: `${color}15`, color }}
      >
        <Icon size={26} />
      </div>

      <div className="action-content">
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>

      <ChevronRight size={20} className="action-arrow" />
    </button>
  );
}
