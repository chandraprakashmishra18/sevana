import { useNavigate } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import EmptyState from "../Common/EmptyState/EmptyState";

export default function MyReportsEmpty() {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={ClipboardList}
      title="No Reports Created"
      description="You haven't submitted any animal rescue reports yet. Your reported cases will appear here once you submit one."
      buttonText="➕ Create New Report"
      onButtonClick={() => navigate("/report")}
      themeColor="#2563eb" // Blue theme
      iconBgColor="#eff6ff"
    />
  );
}
