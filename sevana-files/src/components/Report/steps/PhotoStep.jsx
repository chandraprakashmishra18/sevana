import { useState } from "react";
import { Camera, Upload, Trash2, Loader2 } from "lucide-react";

import { uploadPhoto } from "../../../services/upload.service";

export default function PhotoStep({
  formData,
  updateFields,
  next,
  back,
}) {
  const [uploading, setUploading] =
    useState(false);

  async function handleFile(file) {
    if (!file) return;

    try {
      setUploading(true);

      const result =
        await uploadPhoto(file);

      updateFields({
        images: [
          {
            url: result.url,
            publicId: result.publicId,
          },
        ],
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="report-step">

      <h2>Animal Photo</h2>

      <p>
        A rescue report requires at least
        one image.
      </p>

      <label className="upload-card">

        <input
          hidden
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) =>
            handleFile(
              e.target.files[0]
            )
          }
        />

        <Camera size={44} />

        <span>
          Capture / Upload Photo
        </span>

      </label>

      {uploading && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "12px 0", color: "#6b7280" }}>
          <Loader2 className="spin" size={18} />
          <span>Uploading photo...</span>
        </div>
      )}

      {formData.images?.length > 0 && (

        <div className="photo-preview">

          <img
            src={formData.images[0].url}
            alt=""
          />

          <button
            onClick={() =>
              updateFields({
                images: [],
              })
            }
            disabled={uploading}
          >
            <Trash2 />
          </button>

        </div>

      )}

      <div className="step-actions">

        <button onClick={back} disabled={uploading}>
          Back
        </button>

        <button
          disabled={
            !formData.images?.length || uploading
          }
          onClick={next}
        >
          Continue
        </button>

      </div>

    </div>
  );
}