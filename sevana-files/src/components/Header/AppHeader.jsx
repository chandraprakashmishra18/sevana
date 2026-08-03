import { User } from "lucide-react";
import "./AppHeader.css";

export default function AppHeader() {
  return (
    <header className="app-header">
      <div className="header-logo">
        <span className="logo-emoji">🐾</span>
        <span className="logo-text">Sevana</span>
      </div>

      <div className="header-profile">
        <User size={18} className="profile-icon" />
      </div>
    </header>
  );
}