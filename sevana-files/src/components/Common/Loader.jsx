import "./Loader.css";

export default function Loader({ size = "medium", className = "" }) {
  return (
    <span
      className={`loader loader-${size} ${className}`.trim()}
      aria-label="Loading"
      role="status"
    />
  );
}
