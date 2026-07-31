import "./Input.css";

export default function Input({
  label,
  error,
  ...props
}) {
  return (
    <div className="input-wrapper">

      {label && (
        <label>{label}</label>
      )}

      <input {...props} />

      {error && (
        <small>{error}</small>
      )}

    </div>
  );
}