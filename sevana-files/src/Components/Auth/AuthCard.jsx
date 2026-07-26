export default function AuthCard({ children }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 360,
        background: "#fff",
        padding: 30,
        borderRadius: 16,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </div>
  );
}