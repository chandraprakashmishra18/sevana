import { useState } from "react";

import ReportProgress from "../../components/Report/ReportProgress";
import AnimalStep from "../../components/Report/AnimalStep";
import RescueStep from "../../components/Report/steps/RescueStep";
import LocationStep from "../../components/Report/steps/LocationStep";
import ReviewStep from "../../components/Report/steps/ReviewStep";

import "./Report.css";

export default function ReportScreen() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    animal_type: "",
    species: "",
    breed: "",
    gender: "unknown",
    estimated_age: "",
    color: "",

    severity: "medium",
    condition: "",
    description: "",

    latitude: "",
    longitude: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
  });

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <div className="report-screen">
      <ReportProgress step={step} />

      {step === 1 && (
        <AnimalStep
          formData={formData}
          updateField={updateField}
          next={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <RescueStep
          formData={formData}
          updateField={updateField}
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <LocationStep
          formData={formData}
          updateFields={(values) =>
            setFormData((prev) => ({
              ...prev,
              ...values,
            }))
          }
          back={() => setStep(2)}
          next={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <ReviewStep
          formData={formData}
          back={() => setStep(3)}
          submit={handleSubmit}
          loading={loading}
        />
      )}

    </div>
  );
}
