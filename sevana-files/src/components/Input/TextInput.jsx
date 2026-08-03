export default function TextInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
}) {

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <input
        id={name}
        className={`text-input ${error ? "input-error" : ""}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />

      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
}
