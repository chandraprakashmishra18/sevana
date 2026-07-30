import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "./AuthLayout";
import { useAuth } from "../../context/AuthContext";

import TextInput from "../../components/Input/TextInput";
import PasswordInput from "../../components/Input/PasswordInput";
import PrimaryButton from "../../components/Button/PrimaryButton";

export default function RegisterScreen() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.full_name.trim()) {
      return setError("Full name is required.");
    }

    if (!formData.phone.trim()) {
      return setError("Phone number is required.");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      await signUp({
        full_name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });

      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Sevana and start helping animals."
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign In"
    >
      <form onSubmit={handleSubmit}>

        <TextInput
          label="Full Name"
          name="full_name"
          placeholder="John Doe"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <TextInput
          label="Phone Number"
          name="phone"
          placeholder="+91 XXXXX XXXXX"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <TextInput
          label="Email (Optional)"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <PrimaryButton
          type="submit"
          loading={loading}
        >
          Create Account
        </PrimaryButton>

      </form>
    </AuthLayout>
  );
}