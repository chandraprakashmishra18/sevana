import "./Loader.css";

export default function Loader({
  size = 36,
}) {
  return (
    <div
      className="loader"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}