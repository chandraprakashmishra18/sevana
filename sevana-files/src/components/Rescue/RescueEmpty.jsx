import { useNavigate } from "react-router-dom";
import { PawPrint } from "lucide-react";
import EmptyState from "../Common/EmptyState/EmptyState";

export default function RescueEmpty() {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={PawPrint}
      title="No Active Rescue Requests"
      description="All clear! There are currently no reports of animals needing rescue nearby. If you spot an animal in distress, create a report to notify nearby volunteers."
      buttonText="📢 Report an Animal"
      onButtonClick={() => navigate("/report")}
      themeColor="#10b981"
      iconBgColor="#e8f5e9"
    />
  );
}