export default function FullScreenLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        fontSize: "18px",
        fontWeight: 600,
      }}
    >
      Loading Sevana...
    </div>
  );
}
