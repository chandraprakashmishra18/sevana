import "./PrimaryButton.css";

export default function PrimaryButton({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="primary-btn"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}