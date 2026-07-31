import "./Card.css";

export default function Card({
  children,
  className = "",
  onClick,
}) {
  return (
    <div
      className={`sevana-card ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}