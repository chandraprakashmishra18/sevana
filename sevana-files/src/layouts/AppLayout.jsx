import { Outlet } from "react-router-dom";

import AppHeader from "../components/Header/AppHeader";
import BottomNavigation from "../components/Navigation/BottomNavigation";

import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">

      <AppHeader />

      <main className="app-main">
        <Outlet />
      </main>

      <BottomNavigation />

    </div>
  );
}