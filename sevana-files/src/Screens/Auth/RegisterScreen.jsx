import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

export default function RegisterScreen({ onSwitch }) {
  const { signUp } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    area: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await signUp({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        area: form.area.trim(),
        password: form.password,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Registration failed. Please try again."
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
        onSubmit={handleRegister}
        style={{
          width: "100%",
          maxWidth: 360,
          background: "#fff",
          padding: 30,
          borderRadius: 16,
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <h1>Create Account</h1>

        <p
          style={{
            color: "#666",
            marginBottom: 20,
          }}
        >
          Join the Sevana community.
        </p>

        <input
          name="name"
          placeholder="Full Name"
          autoComplete="name"
          value={form.name}
          disabled={loading}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={form.email}
          disabled={loading}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          autoComplete="tel"
          value={form.phone}
          disabled={loading}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="area"
          placeholder="Area"
          value={form.area}
          disabled={loading}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={form.password}
          disabled={loading}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {error && (
          <div
            style={{
              color: "#D32F2F",
              marginBottom: 15,
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
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={!loading ? onSwitch : undefined}
            style={{
              color: "#2E7D32",
              cursor: loading ? "default" : "pointer",
              fontWeight: 600,
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 15,
  border: "1px solid #ddd",
  borderRadius: 8,
  fontSize: 15,
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