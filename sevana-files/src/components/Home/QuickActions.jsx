import { useNavigate } from "react-router-dom";
import { HeartHandshake, PawPrint, Stethoscope } from "lucide-react";

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
          color="#2b4c6f"
          onClick={() => navigate("/report")}
        />

        <ActionCard
          icon={HeartHandshake}
          title="Rescue Feed"
          subtitle="View nearby cases"
          color="#e07a5f"
          onClick={() => navigate("/rescue")}
        />

        <ActionCard
          icon={Stethoscope}
          title="Nearby Vets"
          subtitle="Find emergency care"
          color="#0369a1"
          onClick={() => navigate("/vets")}
        />
      </div>
    </section>
  );
}
