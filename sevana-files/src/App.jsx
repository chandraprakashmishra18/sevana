import { useAuth } from "./context/AuthContext";

function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        fontSize: "18px",
        fontWeight: 600,
      }}
    >
      Loading Sevana...
    </div>
  );
}

function HomePlaceholder() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "sans-serif",
      }}
    >
      <h1>🐾 Sevana</h1>
      <p>Authentication successful.</p>
      <p>Home Dashboard will be built in Sprint 2.</p>
    </div>
  );
}

function AuthPlaceholder() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      Building Authentication...
    </div>
  );
}

export default function App() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <AuthPlaceholder />;
  }

  return <HomePlaceholder />;
}