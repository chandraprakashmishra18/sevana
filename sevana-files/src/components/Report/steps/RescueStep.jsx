import { useState } from "react";
import { AlertTriangle, ShieldAlert, Heart, Siren } from "lucide-react";

const severityLevels = [
  {
    value: "low",
    title: "Low",
    description: "Minor injury or observation",
    icon: Heart,
    color: "low",
  },
  {
    value: "medium",
    title: "Medium",
    description: "Needs attention soon",
    icon: AlertTriangle,
    color: "medium",
  },
  {
    value: "high",
    title: "High",
    description: "Urgent rescue required",
    icon: ShieldAlert,
    color: "high",
  },
  {
    value: "critical",
    title: "Critical",
    description: "Life-threatening emergency",
    icon: Siren,
    color: "critical",
  },
];

export default function RescueStep({
  formData,
  updateField,
  next,
}) {
  const maxCharacters = 500;
  const [error, setError] = useState("");

  function handleContinue() {
    if (!formData.condition.trim()) {
      setError("Please describe the animal's condition.");
      return;
    }

    if (formData.condition.trim().length < 15) {
      setError("Please provide a little more detail.");
      return;
    }

    setError("");
    next();
  }

  return (
    <div className="report-step">

      <div className="step-header">
        <h2>Rescue Details</h2>
        <p>
          Tell volunteers how serious the situation is.
        </p>
      </div>

      <div className="severity-grid">
        {severityLevels.map((level) => {
          const Icon = level.icon;

          return (
            <button
              key={level.value}
              type="button"
              className={`severity-card ${level.color} ${
                formData.severity === level.value
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                updateField("severity", level.value)
              }
            >
              <Icon size={28} />

              <div>
                <h4>{level.title}</h4>
                <p>{level.description}</p>
              </div>

              {formData.severity === level.value && (
                <span className="selected-check">✓</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="input-group">

        <label htmlFor="condition">
          Describe the animal's condition
        </label>

        <textarea
          id="condition"
          rows={6}
          maxLength={maxCharacters}
          placeholder="Example: The dog appears injured, cannot stand properly, and has a bleeding wound on its front leg..."
          value={formData.condition}
          onChange={(e) =>
            updateField("condition", e.target.value)
          }
        />

        <div className="character-count">
          {formData.condition.length} / {maxCharacters}
        </div>

      </div>

    </div>
  );
}
