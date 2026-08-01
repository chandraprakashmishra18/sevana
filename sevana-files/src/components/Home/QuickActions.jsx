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
          subtitle="Create a new rescue report"
          color="#2E7D32"
          onClick={() => navigate("/report")}
        />

        <ActionCard
          icon={HeartHandshake}
          title="Rescue Feed"
          subtitle="View nearby rescue requests"
          color="#F57C00"
          onClick={() => navigate("/rescue")}
        />

        <ActionCard
          icon={Stethoscope}
          title="Nearby Vets"
          subtitle="Find emergency veterinary care"
          color="#1976D2"
          onClick={() => alert("Vet Finder is coming in Sprint 2")}
        />
      </div>
    </section>
  );
}
