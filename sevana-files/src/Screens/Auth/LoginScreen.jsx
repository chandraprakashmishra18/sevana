import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

export default function LoginScreen({ onSwitch }) {
  const { signIn } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signIn({
        identifier: identifier.trim(),
        password,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F8F7F2",
        padding: 20,
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: 360,
          background: "#fff",
          padding: 30,
          borderRadius: 16,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: 8 }}>Welcome Back</h1>

        <p
          style={{
            color: "#666",
            marginBottom: 24,
          }}
        >
          Login to your Sevana account.
        </p>

        <input
          type="text"
          placeholder="Email or Phone"
          autoComplete="username"
          value={identifier}
          disabled={loading}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        {error && (
          <div
            style={{
              color: "#D32F2F",
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={!loading ? onSwitch : undefined}
            style={{
              color: "#2E7D32",
              cursor: loading ? "default" : "pointer",
              fontWeight: 600,
            }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 16,
  borderRadius: 8,
  border: "1px solid #ddd",
  fontSize: 16,
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: 8,
  background: "#2E7D32",
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
};