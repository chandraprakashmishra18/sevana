import "./InputField.css";

export default function InputField({ label, error, id, ...inputProps }) {
  return (
    <label className="report-input-field" htmlFor={id}>
      <span>{label}</span>
      <input id={id} {...inputProps} />
      {error && <small>{error}</small>}
    </label>
  );
}
