export default function Input({
  label,
  error,
  style,
  ...props
}) {
  return (
    <div style={{ marginBottom: 15 }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: 6,
            fontWeight: 600,
            fontSize: 14,
            color: "#333",
          }}
        >
          {label}
        </label>
      )}

      <input
        {...props}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 8,
          border: error ? "1px solid #D32F2F" : "1px solid #ddd",
          fontSize: 15,
          boxSizing: "border-box",
          ...style,
        }}
      />

      {error && (
        <p
          style={{
            color: "#D32F2F",
            fontSize: 12,
            marginTop: 5,
            marginBottom: 0,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}