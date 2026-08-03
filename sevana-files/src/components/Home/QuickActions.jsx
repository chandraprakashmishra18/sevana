import { useNavigate } from "react-router-dom";
import { HeartHandshake, PawPrint } from "lucide-react";

import ActionCard from "./ActionCard";
import "./QuickActions.css";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="quick-actions">
      <h3 className="section-title">Quick Actions</h3>

      <div className="quick-actions-list">
        <ActionCard
          icon={PawPrint}
          title="Report Animal"
          subtitle="Create a new report"
          color="#10b981"
          onClick={() => navigate("/report")}
        />

        <ActionCard
          icon={HeartHandshake}
          title="Rescue Feed"
          subtitle="View nearby cases"
          color="#f59e0b"
          onClick={() => navigate("/rescue")}
        />
      </div>
    </section>
  );
}
