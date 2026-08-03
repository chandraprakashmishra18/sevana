import "./ReportProgress.css";

export default function ReportProgress({ step }) {
  const steps = [
    "Animal",
    "Condition",
    "Location",
    "Review",
  ];

  return (
    <div className="report-progress">

      <div className="progress-bar">
        {steps.map((label, index) => (
          <div
            key={label}
            className={`progress-step ${
              step >= index + 1 ? "active" : ""
            }`}
          >
            <div className="circle">
              {index + 1}
            </div>

            <span>{label}</span>
          </div>
        ))}
      </div>

    </div>
  );
}