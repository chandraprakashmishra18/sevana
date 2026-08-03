export default function RescueLoading() {
  const skeletons = Array(3).fill(0);

  return (
    <div className="rescue-loading">
      {skeletons.map((_, i) => (
        <div key={i} className="skeleton-card shimmer">
          <div className="skeleton-image" />
          <div style={{ overflow: "hidden", marginBottom: "16px" }}>
            <div className="skeleton-title" />
            <div className="skeleton-badge" />
          </div>
          <div className="skeleton-text" />
          <div className="skeleton-text short" />
          <div className="skeleton-info" style={{ marginTop: "16px" }} />
          <div className="skeleton-info" />
          <div className="skeleton-footer">
            <div className="skeleton-info" style={{ width: "30%", marginBottom: 0 }} />
            <div className="skeleton-button" />
          </div>
        </div>
      ))}
    </div>
  );
}