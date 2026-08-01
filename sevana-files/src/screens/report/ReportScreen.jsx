import { useState } from "react";

import AnimalStep from "../../components/Report/steps/AnimalStep";
import RescueStep from "../../components/Report/steps/RescueStep";
import LocationStep from "../../components/Report/steps/LocationStep";

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

      {step === 1 && (
        <AnimalStep
          formData={formData}
          updateField={updateField}
        />
      )}

      {step === 2 && (
        <RescueStep
          formData={formData}
          updateField={updateField}
        />
      )}

      {step === 3 && (
        <LocationStep
          formData={formData}
          updateField={updateField}
        />
      )}

    </div>
  );
}