import { useId, useState } from "react";
import { Camera, Loader2, CheckCircle } from "lucide-react";

import { uploadPhoto } from "../../../services/upload.service";
import { useToast } from "../../../context/ToastContext";

import "./ImageUploader.css";

export default function ImageUploader({
  value,
  onChange,
}) {
  const inputId = useId();
  const { showToast } = useToast();

  const [uploading, setUploading] = useState(false);

  async function handleFile(file) {
    console.log("HANDLE FILE CALLED");
    console.log(file);

    if (!file) {
      console.log("NO FILE");
      return;
    }

    console.log(file.name);
    console.log(file.type);

    try {
      setUploading(true);

      const uploaded = await uploadPhoto(file);

      onChange({
        url: uploaded.url,
        publicId: uploaded.publicId,
      });
    } catch (err) {
      console.error(err);
      showToast({
        type: "error",
        title: "Upload Failed",
        message: "Image upload failed.",
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="image-uploader">

      <label htmlFor={inputId} className="upload-box">

        {uploading ? (
          <>
            <Loader2 size={32} className="spin" />
            <span>Uploading...</span>
          </>
        ) : value?.url ? (
          <>
            <img
              src={value.url}
              alt="Animal"
              className="preview-image"
            />

            <div className="upload-success">
              <CheckCircle size={18} />
              Uploaded Successfully
            </div>
          </>
        ) : (
          <>
            <Camera size={34} />

            <span>
              Click or Capture Animal Photo
            </span>
          </>
        )}

      </label>

      <input
        id={inputId}
        hidden
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          console.log("INPUT CHANGED");
          console.log(e.target.files);

          handleFile(e.target.files?.[0]);
        }}
      />

    </div>
  );
}
