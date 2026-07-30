export default function EmptyState({
  icon = "📭",
  title = "Nothing here yet",
  description = "Content will appear here when available.",
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 20px",
        color: "#666",
      }}
    >
      <div
        style={{
          fontSize: 48,
          marginBottom: 12,
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          margin: 0,
          marginBottom: 8,
          fontSize: 18,
          color: "#333",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </div>
  );
}