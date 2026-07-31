import "./Report.css";

const ANIMAL_TYPES = [
  "Dog",
  "Cat",
  "Cow",
  "Buffalo",
  "Bird",
  "Monkey",
  "Horse",
  "Goat",
  "Other",
];

export default function AnimalTypeSelect({
  value,
  onChange,
  error,
}) {
  return (
    <div className="form-group">
      <label>Animal Type</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Animal</option>

        {ANIMAL_TYPES.map((animal) => (
          <option
            key={animal}
            value={animal.toLowerCase()}
          >
            {animal}
          </option>
        ))}
      </select>

      {error && <span className="error">{error}</span>}
    </div>
  );
}