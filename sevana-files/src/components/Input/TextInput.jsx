export default function TextInput({
  label,
  id,
  name,
  type = "text",
  error,
  ...inputProps
}) {
  const inputId = id || name;

  return (
    <div className="text-input">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input id={inputId} name={name} type={type} {...inputProps} />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
