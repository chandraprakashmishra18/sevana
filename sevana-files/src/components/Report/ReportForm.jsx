import { useState } from "react";

import Stepper from "./Stepper";
import AnimalStep from "./steps/AnimalStep";
import RescueStep from "./steps/RescueStep";
import LocationStep from "./steps/LocationStep";
import ReviewStep from "./steps/ReviewStep";

import { useCreateReport } from "../../hooks/useCreateReport";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import { useToast } from "../../context/ToastContext";
import { reportSchema } from "../../validation/report.validation";
import Button from "../Common/Button/Button";

import "./Report.css";

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

const STEP_SCHEMAS = [
  reportSchema.pick({ animal_type: true }),
  reportSchema.pick({ severity: true, condition: true }),
  reportSchema.pick({ latitude: true, longitude: true }),
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
  const { toast } = useToast();

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateFields = (values) => {
    setFormData((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const validateStep = () => {
    const schema = STEP_SCHEMAS[currentStepIndex];

    if (!schema) return true;

    const result = schema.safeParse(formData);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    next();
  };

  const submitReport = () => {
    const result = reportSchema.safeParse(formData);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    createReport.mutate(formData);
  };

  return (
    <div className="report-container">

      <Stepper currentStep={currentStepIndex} />

      <div className="report-card">
        <CurrentStep
          formData={formData}
          updateField={updateField}
          updateFields={updateFields}
        />
      </div>

      <div className="report-actions">

        {!isFirstStep && (
          <Button
            variant="secondary"
            onClick={previous}
          >
            Back
          </Button>
        )}

        {!isLastStep ? (
          <Button
            variant="primary"
            onClick={nextStep}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="primary"
            loading={createReport.isPending}
            onClick={submitReport}
          >
            Submit Report
          </Button>
        )}

      </div>

    </div>
  );
}
