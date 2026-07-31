import { Dog, Cat, Bird, Fish, Rabbit, PawPrint, Beef, Horse } from "lucide-react";

const animals = [
  { id: "dog", label: "Dog", icon: Dog },
  { id: "cat", label: "Cat", icon: Cat },
  { id: "cow", label: "Cow", icon: Beef },
  { id: "bird", label: "Bird", icon: Bird },
  { id: "horse", label: "Horse", icon: Horse },
  { id: "goat", label: "Goat", icon: Rabbit },
  { id: "monkey", label: "Monkey", icon: PawPrint },
  { id: "other", label: "Other", icon: Fish },
];

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "unknown", label: "Unknown" },
];

export default function AnimalStep({
  formData,
  updateField,
}) {
  return (
    <div className="report-step">

      <div className="step-header">
        <h2>Animal Information</h2>
        <p>Select the animal and provide basic details.</p>
      </div>

      <div className="animal-grid">
        {animals.map((animal) => {
          const Icon = animal.icon;

          return (
            <button
              key={animal.id}
              type="button"
              className={`animal-card ${
                formData.animal_type === animal.id
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                updateField("animal_type", animal.id)
              }
            >
              <Icon size={34} />

              <span>{animal.label}</span>

              {formData.animal_type === animal.id && (
                <div className="selected-check">✓</div>
              )}
            </button>
          );
        })}
      </div>

      <div className="input-group">
        <label>Species</label>

        <input
          type="text"
          placeholder="Indian Pariah Dog"
          value={formData.species}
          onChange={(e) =>
            updateField("species", e.target.value)
          }
        />
      </div>

      <div className="input-group">
        <label>Breed</label>

        <input
          type="text"
          placeholder="Optional"
          value={formData.breed}
          onChange={(e) =>
            updateField("breed", e.target.value)
          }
        />
      </div>

      <div className="input-row">

        <div className="input-group">
          <label>Estimated Age</label>

          <input
            type="text"
            placeholder="2 years"
            value={formData.estimated_age}
            onChange={(e) =>
              updateField(
                "estimated_age",
                e.target.value
              )
            }
          />
        </div>

        <div className="input-group">
          <label>Color</label>

          <input
            type="text"
            placeholder="Brown"
            value={formData.color}
            onChange={(e) =>
              updateField("color", e.target.value)
            }
          />
        </div>

      </div>

      <div className="gender-section">

        <label>Gender</label>

        <div className="gender-grid">

          {genders.map((gender) => (
            <button
              key={gender.value}
              type="button"
              className={`gender-card ${
                formData.gender === gender.value
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                updateField(
                  "gender",
                  gender.value
                )
              }
            >
              {gender.label}
            </button>
          ))}

        </div>

      </div>

    </div>
  );
}