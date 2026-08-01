import "./GenderSelector.css";

const genders = [
  "male",
  "female",
  "unknown",
];

export default function GenderSelector({
  value,
  onChange,
}) {
  return (
    <div className="form-group">
      <label>Gender</label>

      <div className="radio-group">
        {genders.map((gender) => (
          <label key={gender}>
            <input
              type="radio"
              checked={value === gender}
              onChange={() => onChange(gender)}
            />

            {gender}
          </label>
        ))}
      </div>
    </div>
  );
}
