const FILTERS = [
  "all",
  "critical",
  "high",
  "medium",
  "low",
];

export default function RescueFilters({
  filters,
  setFilters,
}) {
  return (
    <div className="rescue-filters">

      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`filter-chip ${
            filters.severity === filter ||
            (filter === "all" &&
              !filters.severity)
              ? "active"
              : ""
          }`}
          onClick={() =>
            setFilters(
              filter === "all"
                ? {}
                : { severity: filter }
            )
          }
        >
          {filter.charAt(0).toUpperCase() +
            filter.slice(1)}
        </button>
      ))}

    </div>
  );
}