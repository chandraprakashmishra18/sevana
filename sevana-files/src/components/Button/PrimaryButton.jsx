export default function PrimaryButton({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  fullWidth = true,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`primary-button ${fullWidth ? "full-width" : ""}`}
    >
      {loading ? (
        <>
          <span className="button-spinner" />
          Please wait...
        </>
      ) : (
        children
      )}
    </button>
  );
}
