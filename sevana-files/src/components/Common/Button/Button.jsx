import Loader from "../Loader/Loader";
import "./Button.css";

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      className={`button button-${variant} ${className}`.trim()}
    >
      {loading && <Loader size="small" />}
      {children}
    </button>
  );
}
