import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

import HomeScreen from "../screens/home/HomeScreen";
import ReportScreen from "../screens/report/ReportScreen";
import RescueFeedScreen from "../screens/rescue/RescueFeedScreen";
import ReportDetailsScreen from "../screens/rescue/ReportDetailsScreen";
// import VetFinderScreen from "../screens/vet/VetFinderScreen"; // <-- we'll confirm the filename

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginScreen />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterScreen />
          </PublicRoute>
        }
      />

      {/* Protected */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/report"
        element={
          <ProtectedRoute>
            <ReportScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/rescue"
        element={
          <ProtectedRoute>
            <RescueFeedScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports/:id"
        element={<ReportDetailsScreen />}
      />

      {/* Add vet route after confirming filename */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
