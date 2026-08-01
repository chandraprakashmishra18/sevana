import { useState } from "react";
import { useNavigate } from "react-router-dom";

import  useReport  from "../../hooks/useReport";
import { useToast } from "../../context/ToastContext";

import ReportProgress from "../../components/Report/ReportProgress";
import AnimalStep from "../../components/Report/AnimalStep";
import RescueStep from "../../components/Report/steps/RescueStep";
import LocationStep from "../../components/Report/steps/LocationStep";
import ReviewStep from "../../components/Report/steps/ReviewStep";

import "./Report.css";

export default function ReportScreen() {
  const navigate = useNavigate();

  const { submitReport, loading } = useReport();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Animal Information
    animal_type: "",
    species: "",
    breed: "",
    gender: "unknown",
    estimated_age: "",
    color: "",

    // Rescue Details
    severity: "medium",
    condition: "",
    description: "",

    // Location
    latitude: "",
    longitude: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
  });

  // =====================================
  // Update Single Field
  // =====================================
  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  // =====================================
  // Update Multiple Fields
  // =====================================
  function updateFields(values) {
    setFormData((prev) => ({
      ...prev,
      ...values,
    }));
  }

  // =====================================
  // Submit Report
  // =====================================
  async function handleSubmit() {
    try {
      // Basic Validation
      if (!formData.animal_type) {
        alert("Please select an animal.");
        return;
      }

      if (!formData.condition.trim()) {
        alert("Please describe the animal's condition.");
        return;
      }

      if (!formData.latitude || !formData.longitude) {
        alert("Please detect the animal's location.");
        return;
      }

      await submitReport(formData);

      showToast({
        type: "success",
        title: "Report Submitted",
        message: "+50 XP earned! Nearby volunteers have been notified.",
      });

      // Later we'll replace this with a Success Screen
      navigate("/");
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          "Failed to submit report."
      );
    }
  }

  return (
    <div className="report-screen">
      <ReportProgress step={step} />

      {/* =====================================
          STEP 1
      ====================================== */}
      {step === 1 && (
        <AnimalStep
          formData={formData}
          updateField={updateField}
          next={() => setStep(2)}
        />
      )}

      {/* =====================================
          STEP 2
      ====================================== */}
      {step === 2 && (
        <RescueStep
          formData={formData}
          updateField={updateField}
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      )}

      {/* =====================================
          STEP 3
      ====================================== */}
      {step === 3 && (
        <LocationStep
          formData={formData}
          updateFields={updateFields}
          next={() => setStep(4)}
          back={() => setStep(2)}
        />
      )}

      {/* =====================================
          STEP 4
      ====================================== */}
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
