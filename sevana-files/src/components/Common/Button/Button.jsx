import "./Button.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  type = "button",
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        sevana-btn
        sevana-btn-${variant}
        sevana-btn-${size}
        ${fullWidth ? "sevana-btn-full" : ""}
      `}
    >
      {loading ? (
        <span className="btn-loader" />
      ) : (
        <>
          {leftIcon && (
            <span className="btn-icon">
              {leftIcon}
            </span>
          )}

          <span>{children}</span>

          {rightIcon && (
            <span className="btn-icon">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}