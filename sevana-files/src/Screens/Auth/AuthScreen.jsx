import { useState } from "react";

import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

export default function AuthScreen() {
  const [mode, setMode] = useState("login");

  return mode === "login" ? (
    <LoginScreen
      onSwitch={() => setMode("register")}
    />
  ) : (
    <RegisterScreen
      onSwitch={() => setMode("login")}
    />
  );
}