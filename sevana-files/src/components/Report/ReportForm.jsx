import { useState } from "react";

import Stepper from "./Stepper";
import AnimalStep from "./steps/AnimalStep";
import RescueStep from "./steps/RescueStep";
import LocationStep from "./steps/LocationStep";
import ReviewStep from "./steps/ReviewStep";

import { useCreateReport } from "../../hooks/useCreateReport";
import useMultiStepForm from "../../hooks/useMultiStepForm";

import "./styles/Report.css";

const INITIAL_DATA = {
  animal_type: "",
  species: "",
  breed: "",
  gender: "unknown",
  estimated_age: "",
  color: "",

  severity: "",
  condition: "",

  latitude: null,
  longitude: null,

  address: "",
  city: "",
  state: "",
  landmark: "",
};

const STEPS = [
  AnimalStep,
  RescueStep,
  LocationStep,
  ReviewStep,
];

export default function ReportForm() {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const {
    step: CurrentStep,
    currentStepIndex,
    next,
    previous,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm(STEPS);

  const createReport = useCreateReport();

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = () => {
    switch (currentStepIndex) {
      case 0:
        if (!formData.animal_type) {
          alert("Please select an animal.");
          return false;
        }
        return true;

      case 1:
        if (!formData.severity) {
          alert("Please select severity.");
          return false;
        }

        if (!formData.condition.trim()) {
          alert("Please describe the animal's condition.");
          return false;
        }

        return true;

      case 2:
        if (!formData.latitude || !formData.longitude) {
          alert("Please detect the location.");
          return false;
        }

        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep()) return;

    next();
  };

  const submitReport = () => {
    createReport.mutate(formData);
  };

  return (
    <div className="report-container">

      <Stepper currentStep={currentStepIndex} />

      <div className="report-card">
        <CurrentStep
          formData={formData}
          updateField={updateField}
        />
      </div>

      <div className="report-actions">

        {!isFirstStep && (
          <button
            className="secondary-btn"
            onClick={previous}
          >
            Back
          </button>
        )}

        {!isLastStep ? (
          <button
            className="primary-btn"
            onClick={nextStep}
          >
            Next
          </button>
        ) : (
          <button
            className="primary-btn"
            disabled={createReport.isPending}
            onClick={submitReport}
          >
            {createReport.isPending
              ? "Submitting..."
              : "Submit Report"}
          </button>
        )}

      </div>

    </div>
  );
}
