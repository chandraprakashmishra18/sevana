import { NavLink } from "react-router-dom";
import { Home, PlusCircle, AlertCircle } from "lucide-react";

import "./BottomNavigation.css";

export default function BottomNavigation() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <Home size={20} className="nav-icon" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/report" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <PlusCircle size={20} className="nav-icon" />
        <span>Report</span>
      </NavLink>

      <NavLink to="/rescue" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <AlertCircle size={20} className="nav-icon" />
        <span>Rescue</span>
      </NavLink>
    </nav>
  );
}