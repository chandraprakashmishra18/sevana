import { useNavigate } from "react-router-dom";
import { BellOff } from "lucide-react";
import EmptyState from "./EmptyState/EmptyState";

export default function NotificationsEmpty() {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={BellOff}
      title="No Notifications"
      description="You are all caught up! There are no unread notifications right now. We will notify you when new reports are posted nearby."
      buttonText="Go to Rescue Feed"
      onButtonClick={() => navigate("/rescue")}
      themeColor="#ea580c" // Orange theme
      iconBgColor="#fff7ed"
    />
  );
}
