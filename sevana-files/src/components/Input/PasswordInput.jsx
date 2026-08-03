import { useState } from "react";

export default function PasswordInput({
  label,
  name,
  value,
  onChange,
  placeholder = "Enter password",
  error,
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="password-wrapper">
        <input
          id={name}
          className={`text-input ${error ? "input-error" : ""}`}
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword((previous) => !previous)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
}
