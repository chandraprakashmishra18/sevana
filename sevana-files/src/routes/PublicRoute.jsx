import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FullScreenLoader from "../components/Loader/FullScreenLoader";

export default function PublicRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <FullScreenLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
