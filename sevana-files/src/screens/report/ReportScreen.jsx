import { useState } from "react";

import AnimalStep from "../../components/Report/steps/AnimalStep";
import RescueStep from "../../components/Report/steps/RescueStep";
import LocationStep from "../../components/Report/steps/LocationStep";

import "./Report.css";

export default function ReportScreen() {
  const [step, setStep] = useState(1);

  const [report, setReport] = useState({
    animalType: "",
    gender: "",
    condition: "",
    description: "",
    latitude: "",
    longitude: "",
    address: "",
  });

  const updateReport = (values) => {
    setReport((prev) => ({
      ...prev,
      ...values,
    }));
  };

  return (
    <div className="report-screen">

      {step === 1 && (
        <AnimalStep
          data={report}
          updateData={updateReport}
          next={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <RescueStep
          data={report}
          updateData={updateReport}
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <LocationStep
          data={report}
          updateData={updateReport}
          back={() => setStep(2)}
        />
      )}

    </div>
  );
}