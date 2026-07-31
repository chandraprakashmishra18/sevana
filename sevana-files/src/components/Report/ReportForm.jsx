import { useState } from "react";

import Stepper from "./Stepper";
import AnimalStep from "./steps/AnimalStep";
import RescueStep from "./steps/RescueStep";
import LocationStep from "./steps/LocationStep";
import ReviewStep from "./steps/ReviewStep";

import { useCreateReport } from "../../hooks/useCreateReport";

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

export default function ReportForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_DATA);

  const createReport = useCreateReport();

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = () => {
    switch (currentStep) {
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

    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const submitReport = () => {
    createReport.mutate(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <AnimalStep
            formData={formData}
            updateField={updateField}
          />
        );

      case 1:
        return (
          <RescueStep
            formData={formData}
            updateField={updateField}
          />
        );

      case 2:
        return (
          <LocationStep
            formData={formData}
            updateField={updateField}
          />
        );

      case 3:
        return (
          <ReviewStep
            formData={formData}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="report-container">

      <Stepper currentStep={currentStep} />

      <div className="report-card">
        {renderStep()}
      </div>

      <div className="report-actions">

        {currentStep > 0 && (
          <button
            className="secondary-btn"
            onClick={previousStep}
          >
            Back
          </button>
        )}

        {currentStep < 3 ? (
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