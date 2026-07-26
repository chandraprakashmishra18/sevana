import React, { Component, useEffect, useState } from "react";
import { T } from "./Styles/Theme";

import client from "./api/client";
import { useAuth } from "./Context/AuthContext";

import GlobalStyles from "./Components/Layout/GlobalStyles";
import BottomNav from "./Components/Layout/BottomNav";
import XPToast from "./Components/Feedback/XPToast";

import AuthScreen from "./Screens/Auth/AuthScreen";
import HomeScreen from "./Screens/Home/HomeScreen";
import ReportScreen from "./Screens/Report/ReportScreen";
import RescueFeed from "./Screens/RescueFeed/RescueFeed";
import VetFinder from "./Screens/Vets/VetFinder";
import ProfileScreen from "./Screens/Profile/ProfileScreen";


/* -------------------------------------------------------------------------- */
/*                              Error Boundary                                */
/* -------------------------------------------------------------------------- */

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      info: null,
    };
  }

  componentDidCatch(error, info) {
    console.error(error);

    this.setState({
      error,
      info,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            padding: "24px 16px",
            fontFamily: "monospace",
            background: "#FFF0F0",
            minHeight: "100vh",
            color: "#C93B3B",
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "2px solid #C93B3B",
              borderRadius: 12,
              padding: 20,
              maxWidth: 430,
              margin: "0 auto",
            }}
          >
            <h2>💥 React Crash</h2>

            <p>{this.state.error?.message}</p>

            <pre
              style={{
                background: "#FFECEC",
                padding: 10,
                borderRadius: 8,
                overflowX: "auto",
                maxHeight: 300,
                overflowY: "auto",
              }}
            >
              {this.state.info?.componentStack}
            </pre>

            <button
              onClick={() =>
                this.setState({
                  error: null,
                  info: null,
                })
              }
              style={{
                marginTop: 20,
                padding: "10px 18px",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                background: "#C93B3B",
                color: "#fff",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/*                                    App                                     */
/* -------------------------------------------------------------------------- */

export default function App() {
  const { loading, isAuthenticated, user } = useAuth();

  const [tab, setTab] = useState("home");

  const [xp, setXp] = useState(0);

  const [toast, setToast] = useState(false);
  const [toastAmt, setToastAmt] = useState(0);

  // Sync XP whenever logged-in user changes
  useEffect(() => {
    if (user) {
      setXp(user.xp || 0);
    }
  }, [user]);

  // Development backend health check
  useEffect(() => {
    if (!import.meta.env.DEV) return;

    async function testBackend() {
      try {
        const res = await client.get("/health");

        console.log("✅ Backend Connected");
        console.log(res.data);
      } catch (err) {
        console.error("❌ Backend Connection Failed");
        console.error(err);
      }
    }

    testBackend();
  }, []);

  /* ------------------------------ XP Toast ------------------------------ */

  const awardXP = (amount) => {
    setXp((prev) => prev + amount);

    setToastAmt(amount);
    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 1800);
  };

  /* --------------------------- User Data --------------------------- */

  const userData = {
    name: user?.name || "",
    area: user?.area || "",
    rescues: user?.rescues || 0,
    streak: user?.streak_days || 0,
  };

  /* --------------------------- Auth Gate --------------------------- */

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  /* -------------------------------- UI -------------------------------- */

  return (
    <div
      style={{
        maxWidth: 430,
        margin: "0 auto",
        minHeight: "100vh",
        background: T.bg,
        position: "relative",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <GlobalStyles />

      <XPToast visible={toast} amount={toastAmt} />

      <div
        style={{
          height: "calc(100vh - 60px)",
          overflowY: "auto",
        }}
      >
        <ErrorBoundary key={tab}>
          {tab === "home" && (
            <HomeScreen
              onNav={setTab}
              onXP={awardXP}
              userData={userData}
              xp={xp}
            />
          )}

          {tab === "report" && (
            <ReportScreen />
          )}

          {tab === "feed" && (
            <RescueFeed
              onXP={awardXP}
            />
          )}

          {tab === "vets" && <VetFinder />}

          {tab === "profile" && (
            <ProfileScreen
              xp={xp}
              userData={userData}
            />
          )}
        </ErrorBoundary>
      </div>

      <BottomNav
        active={tab}
        onSelect={setTab}
      />
    </div>
  );
}