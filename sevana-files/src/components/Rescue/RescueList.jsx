import RescueCard from "./RescueCard";

export default function RescueList({
  reports,
}) {
  return (
    <div className="rescue-list">

      {reports.map((report) => (
        <RescueCard
          key={report.id}
          report={report}
        />
      ))}

    </div>
  );
}