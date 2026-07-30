import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "./AuthLayout";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../validation/auth.validation";

import TextInput from "../../components/Input/TextInput";
import PasswordInput from "../../components/Input/PasswordInput";
import PrimaryButton from "../../components/Button/PrimaryButton";

export default function LoginScreen() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
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

    const validation = loginSchema.safeParse(formData);

    if (!validation.success) {
      return setError(validation.error.issues[0].message);
    }

    try {
      setLoading(true);

      await signIn(formData);

      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to continue helping animals."
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Create Account"
    >
      <form onSubmit={handleSubmit}>

        <TextInput
          label="Email / Phone"
          name="identifier"
          placeholder="Enter email or phone"
          value={formData.identifier}
          onChange={handleChange}
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
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
          Continue
        </PrimaryButton>

      </form>
    </AuthLayout>
  );
}
