import "./styles/Report.css";

const Stepper = ({ currentStep }) => {
  const steps = [
    "Animal",
    "Details",
    "Location",
    "Review",
  ];

  return (
    <div className="report-stepper">
      {steps.map((step, index) => {
        const completed = index < currentStep;
        const active = index === currentStep;

        return (
          <div
            key={step}
            className="step-item"
          >
            <div
              className={`step-circle ${
                completed
                  ? "completed"
                  : active
                  ? "active"
                  : ""
              }`}
            >
              {completed ? "✓" : index + 1}
            </div>

            <span
              className={`step-label ${
                active ? "active-label" : ""
              }`}
            >
              {step}
            </span>

            {index !== steps.length - 1 && (
              <div
                className={`step-line ${
                  completed ? "completed-line" : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;