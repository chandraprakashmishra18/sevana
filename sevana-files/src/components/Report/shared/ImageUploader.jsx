import { useId } from "react";
import "./ImageUploader.css";

export default function ImageUploader({ value, onChange, accept = "image/*" }) {
  const inputId = useId();

  return (
    <div className="image-uploader">
      <label htmlFor={inputId}>Add photo</label>
      <input
        id={inputId}
        type="file"
        accept={accept}
        onChange={(event) => onChange?.(event.target.files?.[0] ?? null)}
      />
      {value?.name && <span>{value.name}</span>}
    </div>
  );
}
