import "./XPCard.css";
import { Award, TrendingUp } from "lucide-react";

export default function XPCard({
  xp = 250,
  level = 3,
  nextLevelXP = 500,
}) {
  const percentage = Math.min((xp / nextLevelXP) * 100, 100);

  return (
    <section className="xp-card">
      <div className="xp-header">
        <div>
          <span className="xp-title">
            Your Progress
          </span>

          <h3>
            Level {level}
          </h3>
        </div>

        <div className="xp-badge">
          <Award size={24} />
        </div>
      </div>

      <div className="xp-stats">

        <div className="xp-item">
          <TrendingUp size={18} />
          <span>{xp} XP</span>
        </div>

        <div className="xp-item">
          <span>{nextLevelXP - xp} XP to next level</span>
        </div>

      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </section>
  );
}