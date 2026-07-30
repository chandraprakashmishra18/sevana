import { NavLink } from "react-router-dom";

import "./BottomNavigation.css";

export default function BottomNavigation() {
  return (
    <nav className="bottom-nav">

      <NavLink to="/">
        Home
      </NavLink>

      <NavLink to="/report">
        Report
      </NavLink>

      <NavLink to="/rescue">
        Rescue
      </NavLink>

      <NavLink to="/vets">
        Vets
      </NavLink>

      <NavLink to="/profile">
        Profile
      </NavLink>

    </nav>
  );
}