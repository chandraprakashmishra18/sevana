import "./ReviewStep.css";

export default function ReviewStep({
  formData,
  back,
  submit,
  loading,
}) {
  return (
    <div className="report-step">

      <div className="step-header">
        <h2>Review Report</h2>

        <p>
          Please verify all details before submitting.
        </p>
      </div>

      <div className="review-card">

        <h3>🐾 Animal Information</h3>

        <div className="review-row">
          <span>Animal</span>
          <strong>{formData.animal_type || "-"}</strong>
        </div>

        <div className="review-row">
          <span>Species</span>
          <strong>{formData.species || "-"}</strong>
        </div>

        <div className="review-row">
          <span>Breed</span>
          <strong>{formData.breed || "-"}</strong>
        </div>

        <div className="review-row">
          <span>Gender</span>
          <strong>{formData.gender}</strong>
        </div>

        <div className="review-row">
          <span>Estimated Age</span>
          <strong>{formData.estimated_age || "-"}</strong>
        </div>

        <div className="review-row">
          <span>Color</span>
          <strong>{formData.color || "-"}</strong>
        </div>

      </div>

      <div className="review-card">

        <h3>🚑 Rescue Details</h3>

        <div className="review-row">
          <span>Severity</span>
          <strong>{formData.severity}</strong>
        </div>

        <p className="review-description">
          {formData.condition}
        </p>

      </div>

      {formData.images?.[0]?.url && (
        <div className="review-card">
          <h3>Photo</h3>
          <img
            className="review-image"
            src={formData.images[0].url}
            alt=""
          />
        </div>
      )}

      <div className="review-card">

        <h3>📍 Location</h3>

        <div className="review-row">
          <span>Address</span>
          <strong>{formData.address}</strong>
        </div>

        <div className="review-row">
          <span>City</span>
          <strong>{formData.city}</strong>
        </div>

        <div className="review-row">
          <span>State</span>
          <strong>{formData.state}</strong>
        </div>

        <div className="review-row">
          <span>Landmark</span>
          <strong>{formData.landmark || "-"}</strong>
        </div>

      </div>

      <div className="step-actions">

        <button
          className="secondary-btn"
          onClick={back}
        >
          ← Back
        </button>

        <button
          className="primary-btn"
          onClick={submit}
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : "Submit Report"}
        </button>

      </div>

    </div>
  );
}
