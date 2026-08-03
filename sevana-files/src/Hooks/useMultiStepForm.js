import { useState } from "react";

export default function useMultiStepForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex((prev) =>
      prev >= steps.length - 1 ? prev : prev + 1
    );
  };

  const previous = () => {
    setCurrentStepIndex((prev) =>
      prev <= 0 ? 0 : prev - 1
    );
  };

  const goTo = (index) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  };

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,

    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,

    next,
    previous,
    goTo,
  };
}